import { Component } from '@angular/core';
import { NavController ,LoadingController,AlertController,} from 'ionic-angular';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html'
})
export class NewEventPage {
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;

  isPerm:boolean=false;
  Change_Cate:any;
  Change_Loca:any;
  public Event:any[] = ["ID","Event_Connect","Event_Name","Event_Location","Event_Info","Event_Limit","Event_Cate","Event_Type","Start_Date","End_Date","Start_Time","End_Time","Repeat_Week","Create_Date","Create_By","Location"];
  Campus:any;
  Event_Cate:any;

  constructor(private ajaxCall: AjaxCallProvider,private storage: Storage,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public navCtrl: NavController) {
    // this.Event["Repeat_Week"]=["Tue","Wed"];
    
  }

  ionViewDidEnter() {
    this.isSignedIn = null;
    this.Name= null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;
    
    this.getStroage();

    this.Change_Cate=[];
   this.Event_Cate=[];
   this.Campus=[];
   this.ajaxCall.getEvents_Call("","Get_Campus").then(result =>{
    this.Campus=result;
    this.Campus=this.ajaxCall.transform_to_group(this.Campus,"Location");
    console.log(this.Campus);
    this.Event["Location"]=this.Campus[0].list[0].Location;
    this.SetCamp(0);
   });
   this.ajaxCall.getEvents_Call("","Get_Event_Cate").then(result =>{
     this.Event_Cate=result;
     this.Event_Cate=this.ajaxCall.transform_to_group(this.Event_Cate,"Cate_Name");
     console.log(this.Event_Cate);
   });
  }
  SaveEvent(){
    
    // let obj = { 'ID':this.Event['ID'],'Event_Connect':this.Event['Event_Connect'],'Event_Name':this.Event['Event_Name'],'Event_Location':this.Event['Event_Location'],'Event_Info':this.Event['Event_Info'],'Event_Limit':this.Event['Event_Limit'],'Event_Cate':this.Event['Event_Cate'],'Event_Type':this.Event['Event_Type'].ID,'Start_Date':this.Event['Start_Date'],'End_Date':this.Event['End_Date'],'Start_Time':this.Event['Start_Time'],'End_Time':this.Event['End_Time'],'Repeat_Week':(typeof this.Event['Repeat_Week'] === "undefined" ? "" : this.Event['Repeat_Week'].toString()),'Create_By':this.Name };
    let obj = { 'ID':this.Event['ID'],'Event_Connect':this.Event['Event_Connect'],'Event_Name':this.Event['Event_Name'],'Event_Location':this.Event['Event_Location'],'Event_Info':this.Event['Event_Info'],'Event_Limit':this.Event['Event_Limit'],'Event_Cate':this.Event['Event_Type'].Type,'Event_Type':this.Event['Event_Type'].ID,'Start_Date':this.Event['Start_Date'],'End_Date':this.Event['End_Date'],'Start_Time':this.Event['Start_Time'],'End_Time':this.Event['End_Time'],'Repeat_Week':(typeof this.Event['Repeat_Week'] === "undefined" ? "" : this.Event['Repeat_Week'].toString()),'Create_By':this.Name };
    console.log(obj);
    this.ajaxCall.AddEvents_Call("Set_Event",obj,this.Name).then(available => {
      if(available){
        this.navCtrl.pop();
       }
    });
  }
  SetCate(Cate){
    this.Change_Cate=this.Event_Cate[Cate-1].list; //wrong method before add one more member.
  }
  SetCamp(id){
    this.Change_Loca=this.Campus[id].list; //wrong method before add one more member.
  }
  Check_Perm(){
    if(this.Event['Event_Type'].Type=="1"){
      this.isPerm=true;
      this.Event['Start_Date']=null;
      this.Event['End_Date']=null;
      console.log(this.isPerm);
    }else{
      this.isPerm=false;
      console.log(this.isPerm);
    }
    //console.log(this.Event['Event_Type']+"<"+this.isPerm);
  }

  getStroage() {
    this.storage.get('Login').then((val) => {
      this.log("my login hash" + val);
      if (val != null) {
        this.Account("Hash_Login", val, "","");
      }
      else {
        //this.navCtrl.popToRoot ();
        //  this.Login("Hash_Login","96a3be3cf272e017046d1b2674a52bd3","");
      }
    });
  }
  Account(type, info, info2, info3) {

    let loader = this.loadingCtrl.create({
      content: "...請等候..."
    });
    loader.present();
    setTimeout(() => {
      loader.dismiss().catch(() => {
        this.log('loader error---1(SignIn)');
      });
    }, 5000);
    var xmlhttp = new XMLHttpRequest();
    var url = "http://101.78.175.101:8580/foodangel/checkUser.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj['result']) {
          switch (type) {
            case "My_Logout":
              this.storage.clear();
              this.isSignedIn = "";
              this.Name = "";
              this.Staff_ID = "";
              this.Staff_Hash = "";
              this.Staff_Dept = "";
              break;
            //case "Change_PW":
            default:
              this.isSignedIn = obj.Staff.Session;
              this.storage.set('Login', this.isSignedIn);
              this.storage.set('Name', obj.Staff.Name);
              this.storage.set('Staff_ID', obj.Staff.Staff_ID);
              this.storage.set('Staff_Hash', obj.Staff.Staff_Hash);
              this.storage.set('Staff_Dept', obj.Staff.Staff_Dept);
              this.Name = obj.Staff.Name;
              this.Staff_ID = obj.Staff.Staff_ID;
              this.Staff_Hash = obj.Staff.Staff_Hash;
              this.Staff_Dept = obj.Staff.Staff_Dept;
              break;
          }


          loader.dismiss().catch(() => {
            this.log('loader error---2(SignIn)');
          });
        }
        else {
          loader.dismiss().catch(() => {
            this.log('loader error---3(SignIn)');
          });

          let alert = this.alertCtrl.create({
            title: 'Some issue!',
            subTitle: 'Account information incorrect.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.popToRoot ();
        }

      }

    }

    var obj = { "Function": type, "info": info, "info2": info2, "info3": info3, "Passcode": "CheckME" };
    this.log(obj);

    //var obj = { "Username": this.Username, "Password": this.Password };
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
  }
  log(info) {
    console.log(info);
  }

}
