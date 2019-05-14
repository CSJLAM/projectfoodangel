import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { EventManagementPage } from '../event-management/event-management';
import { NewEventPage } from '../new-event/new-event';
import { UpdateEventPage } from '../update-event/update-event';
import { EventCategroryListPage } from '../event-categrory-list/event-categrory-list';
import { EventCategorySettingPage } from '../event-category-setting/event-category-setting';
import { StaffSettingPage } from '../staff-setting/staff-setting';
import { StaffListPage } from '../staff-list/staff-list';
import { StaffInfoPage } from '../staff-info/staff-info';
import { StaffLevelListPage } from '../staff-level-list/staff-level-list';
import { StaffLevelPage } from '../staff-level/staff-level';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';

@Component({
  selector: 'page-system-management',
  templateUrl: 'system-management.html'
})
export class SystemManagementPage {
  //permission
  Permission_List:any;
  NewAndEditEvent=false;
  Reports=false;
  //
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;
  
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};
  constructor(private iab: InAppBrowser,public navCtrl: NavController, 
    public alertCtrl: AlertController, public actionsheetCtrl: ActionSheetController,
    public platform: Platform, public loadingCtrl: LoadingController,
    private storage: Storage, private ajaxCall: AjaxCallProvider) {
    
  }
  ionViewDidEnter() {
    
    this.isSignedIn = null;
    this.Name= null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;
    
    this.getStroage();
    
  }
  Check_Permission(){
    this.ajaxCall.getEvents_Call("","Check_Permission",this.Staff_Dept.toString(),this.Staff_Hash.toString()).then(result =>{
      this.Permission_List=result;
      var NewAndEditEvent = this.Permission_List.findIndex(work => work.Page === "NewAndEditEvent");
      if(NewAndEditEvent!=-1){
        this.NewAndEditEvent=true;
       }
       var Reports = this.Permission_List.findIndex(work => work.Page === "Reports");
      if(Reports!=-1){
        this.Reports=true;
       }
       
       
    });
  }
  goToEventManagement(params){
    if (!params) params = {};
    this.navCtrl.push(EventManagementPage);
  }goToNewEvent(params){
    if (!params) params = {};
    this.navCtrl.push(NewEventPage);
  }goToUpdateEvent(params){
    if (!params) params = {};
    this.navCtrl.push(UpdateEventPage);
  }goToEventCategroryList(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategroryListPage);
  }goToEventCategorySetting(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategorySettingPage);
  }goToStaffSetting(params){
    if (!params) params = {};
    this.navCtrl.push(StaffSettingPage);
  }goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  }goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  }goToStaffLevelList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffLevelListPage);
  }goToStaffLevel(params){
    if (!params) params = {};
    this.navCtrl.push(StaffLevelPage);
  }GoToReport(){
    let target = "_self";
    let link = "http://101.78.175.101:8580/foodangel/MyReport.php?jsonDoc="+this.isSignedIn;
    this.iab.create(link,target);
    
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

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '設定',
      //cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '登出',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'log-out' : null,
          handler: () => {
            let prompt = this.alertCtrl.create({
              title: '確定登出?',
              //  message: "Do you want to make this post?",

              buttons: [
                {
                  text: '取消',
                  handler: data => {
                    this.log('Cancel clicked');
                  }
                },
                {
                  text: '登出',
                  handler: data => {
                    this.Account("My_Logout",this.isSignedIn,"","");
                    this.navCtrl.popToRoot ();
                  }
                }
              ]
            });
            prompt.present();
            this.log('Sign out clicked');
          }
        },
        {
          text: '更改密碼',
          icon: !this.platform.is('ios') ? 'construct' : null,
          handler: () => {
            let prompt = this.alertCtrl.create({
              title: '更改密碼?',
              //  message: "Do you want to make this post?",
              inputs: [
                {
                  name: 'pw',
                  type: 'password',
                  placeholder: '舊密碼'
                },
                {
                  name: 'npw1',
                  type: 'password',
                  placeholder: '新密碼'
                },
                {
                  name: 'npw2',
                  type: 'password',
                  placeholder: '確認密碼'
                }
              ],

              buttons: [
                {
                  text: '取消',
                  handler: data => {
                    this.log('Cancel clicked');
                  }
                },
                {
                  text: '更改密碼',
                  handler: data => {
                    if(data.npw1==data.npw2){
                    this.Account("Change_PW",this.Staff_ID,data.pw,data.npw1);  
                    }
                    //this.onChangePW(data.pw,data.npw1,data.npw2);
                  }
                }
              ]
            });
            prompt.present();
            this.log('Change Password clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  Account(type, info, info2, info3) {

    // let loader = this.loadingCtrl.create({
    //   content: "登入中...請等候..."
    // });
    // loader.present();
    // setTimeout(() => {
    //   loader.dismiss().catch(() => {
    //     this.log('loader error---1(SignIn)');
    //   });
    // }, 5000);
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
              this.Check_Permission();
              break;
          }


          // loader.dismiss().catch(() => {
          //   this.log('loader error---2(SignIn)');
          // });
        }
        else {
            // loader.dismiss().catch(() => {
            //   this.log('loader error---3(SignIn)');
            // });

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
