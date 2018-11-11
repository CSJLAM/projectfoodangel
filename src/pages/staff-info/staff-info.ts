import { Component } from '@angular/core';
import { NavController ,AlertController, LoadingController, NavParams ,} from 'ionic-angular';
import { StaffListPage } from '../staff-list/staff-list';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-staff-info',
  templateUrl: 'staff-info.html'
})
export class StaffInfoPage {
  temp:any;
  public Staff:any[]= ['ID','Staff_ID','Staff_Hash','Username','Name','Password','Password2','Staff_Dept','Staff_Join','Staff_End','Create_By'];
  public Depts:any;
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;
  constructor(private ajaxCall: AjaxCallProvider, private storage: Storage,public navParams: NavParams,public alertCtrl: AlertController,public navCtrl: NavController,public loadingCtrl: LoadingController,) {
    this.temp = this.navParams.data.params;
    if(this.temp!=undefined){
      this.ajaxCall.Deptlisting_Call("Load_Staff_Info",this.temp.Staff_Hash,"","").then(available => {
      
           console.log("available");
          console.log(available);
        
         this.temp=available;
         this.Staff=this.temp[0];

         console.log("available");
        
      });
    }
    // this.dept['ID'] = this.temp.ID;
    // this.dept['Dept_Name'] = this.temp.Dept_Name;
    // this.dept['Dept_Hash'] = this.temp.Dept_Hash;
  }
  ionViewDidEnter() {
    this.Depts =[];
    this.isSignedIn = null;
    this.Name= null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;
    
    this.getStroage();
    //this.Depts=this.ajaxCall.Deptlisting("Show_Dept","","","");
    this.ajaxCall.Deptlisting_Call("Show_Dept","","","").then(available => {
      
    //   console.log("available");
    //  console.log(available);
     console.log( available[0].Dept_Name);
     this.Depts=available;
    //  console.log("available");
    
  });
  
    
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
  Add_Staff(){
    if(this.Staff['Password']==this.Staff['Password2']){
    let obj = { 'ID':this.Staff['ID'],'Staff_ID':this.Staff['Staff_ID'],'Staff_Hash':this.Staff['Staff_Hash'],'Username':this.Staff['Username'],'Name':this.Staff['Name'],'Password':this.Staff['Password'],'Staff_Dept':this.Staff['Staff_Dept'],'Staff_Join':this.Staff['Staff_Join'],'Staff_End':(typeof this.Staff['Staff_End'] === "undefined" ? "" : this.Staff['Staff_End']) };
    
    this.ajaxCall.Deptlisting_Call("Add_Staff",obj,this.Name,"").then(available => {
      if(available){
        this.navCtrl.pop();
       }
    });
  }
  else{
    alert("Password are not the same");
  }
  }
  goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  }goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  }
}
