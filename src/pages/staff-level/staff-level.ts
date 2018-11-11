import { Component } from '@angular/core';
import { NavController, NavParams , Platform, ActionSheetController, AlertController, LoadingController,} from 'ionic-angular';

import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-staff-level',
  templateUrl: 'staff-level.html'
})
export class StaffLevelPage {
  haveData:boolean=false;
  check: boolean;
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;
  temp: any;
  dept: any[] = ['ID', 'Dept_Name', 'Dept_Hash'];
  constructor(private ajaxCall: AjaxCallProvider, public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public alertCtrl: AlertController, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public platform: Platform) {
    this.temp = this.navParams.data.params;
    this.dept['ID'] = this.temp.ID;
    this.dept['Dept_Name'] = this.temp.Dept_Name;
    this.dept['Dept_Hash'] = this.temp.Dept_Hash;
    this.log(this.dept);
    if (this.dept['Dept_Hash'] != undefined) {
      //this.temp=this.ajaxCall.Deptlisting("Show_Dept1","","","");
      this.haveData=true;
      //console.log(this.temp + "7r8937493879479");
    }
  }
  ionViewDidEnter() {

    this.isSignedIn = null;
    this.Name = null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;

    this.getStroage();
  }

  log(a) {
    console.log(a);
  }
  save() {
    this.check = false;
    if (this.dept['Dept_Name']!=undefined) {
      if (this.dept['Dept_Hash'] == undefined) {

        this.ajaxCall.Deptlisting_Call("Add_Dept", this.dept['Dept_Name'], Date.now(), this.Name).then(available => {

         if(available){
          this.navCtrl.pop();
         }
       
        
      });
      
      }else if(this.dept['Dept_Hash'] != undefined){
        // this.check = this.ajaxCall.Deptlisting("Edit_Dept", this.dept['Dept_Hash'], this.dept['Dept_Name'], this.Name);
        // this.navCtrl.pop();
        this.ajaxCall.Deptlisting_Call("Edit_Dept", this.dept['Dept_Hash'], this.dept['Dept_Name'], this.Name).then(available => {
          if(available){
           this.navCtrl.pop();
          }
        
         
       });
        
      }
    }
  }
  openMenu() {
    
            let prompt = this.alertCtrl.create({
              title: '刪除',
              //  message: "Do you want to make this post?",

              buttons: [
                {
                  text: '取消',
                  handler: data => {
                    this.log('Cancel clicked');
                  }
                },
                {
                  text: '刪除',
                  handler: data => {
                    this.ajaxCall.Deptlisting_Call("Delete_Dept", this.dept['Dept_Hash'], "", this.Name).then(available => {
                      if(available){
                       this.navCtrl.pop();
                      };
                    });
                    //this.navCtrl.pop();
                  }
                }
              ]
            });
            prompt.present();
            
  }
  getStroage() {
    this.storage.get('Login').then((val) => {
      this.log("my login hash" + val);
      if (val != null) {
        this.Account("Hash_Login", val, "", "");
      }
      else {
        //this.navCtrl.popToRoot ();
        //  this.Login("Hash_Login","96a3be3cf272e017046d1b2674a52bd3","");
      }
    });
  }
  Account(type, info, info2, info3) {

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



        }
        else {

          this.navCtrl.popToRoot();
        }

      }

    }

    var obj = { "Function": type, "info": info, "info2": info2, "info3": info3, "Passcode": "CheckME" };
    this.log(obj);

    //var obj = { "Username": this.Username, "Password": this.Password };
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
  }
}
