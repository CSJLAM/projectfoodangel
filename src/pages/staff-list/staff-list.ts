import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController, AlertController, LoadingController, } from 'ionic-angular';
import { StaffInfoPage } from '../staff-info/staff-info';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html'
})
export class StaffListPage {
  public Staffs: any[] = [];
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;
  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public platform: Platform) {
  }
  ionViewDidEnter() {
    this.Staffs =[];
    this.isSignedIn = null;
    this.Name= null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;
    
    this.getStroage();
    this.Stafflisting("Show_Staff","","","");
  }
  goToStaffInfo(params,parmse2){
    //if (!params) params = {};
    this.navCtrl.push(StaffInfoPage,{params,parmse2});
  }
  goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
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
  Stafflisting(type, info, info2, info3) {

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
            case "Show_Staff":
            console.info(obj.info);
            //for(var i = 0, count=10; i < obj.some.length; i++)
  
            for (var i = 0; i < obj.info.length; i++) {
              var result = obj.info[i];
              //this.log(Your);
              //this.log('++');
              this.Staffs.push({ "ID": result.ID, "Staff_ID": result.Staff_ID, "Name": result.Name ,"Staff_Hash":result.Staff_Hash});
  
            }
              break;
            //case "Change_PW":
            default:
            
              break;
          }


          loader.dismiss().catch(() => {
            this.log('loader error---2(');
          });
        }
        else {
          loader.dismiss().catch(() => {
            this.log('loader error---3(');
          });

          let alert = this.alertCtrl.create({
            title: 'Some issue!',
            subTitle: 'Internet Error',
            buttons: ['OK']
          });
          alert.present();
        
        }

      }

    }

    var obj = { "Function": type, "info": info, "info2": info2, "info3": info3, "Passcode": "CheckME" };
    this.log(obj);

    //var obj = { "Username": this.Username, "Password": this.Password };
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
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
