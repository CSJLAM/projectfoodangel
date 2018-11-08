import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, } from 'ionic-angular';
import { TakeAttendancePage } from '../take-attendance/take-attendance';
import { MembershipManagementPage } from '../membership-management/membership-management';
import { MembershipApplyPage } from '../membership-apply/membership-apply';
import { MembershipEditPage } from '../membership-edit/membership-edit';
import { MemberListPage } from '../member-list/member-list';
import { SettlePermEventListPage } from '../settle-perm-event-list/settle-perm-event-list';
import { SettlePermEventInfoPage } from '../settle-perm-event-info/settle-perm-event-info';
import { EventCalendarPage } from '../event-calendar/event-calendar';
import { MemberEventRecordPage } from '../member-event-record/member-event-record';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';
import { EvnetInfoPage } from '../evnet-info/evnet-info';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';
import { SystemManagementPage } from '../system-management/system-management';
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

import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-food-angel',
  templateUrl: 'food-angel.html'
})
export class FoodAngelPage {
  public Events: any[] = [];
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;
  public Username: String = "";
  public Password: string = "";
  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    //storage.clear();
    //this.getStroage();
    //this.getEvents(1);

  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    
  }
  ionViewDidEnter() {
    this.Events = [];
    this.isSignedIn = null;
    this.Name= null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;
    this.Username = "";
    this.Password = "";
    this.getStroage();
  }
  goToTakeAttendance(params) {
    if (!params) params = {};
    this.navCtrl.push(TakeAttendancePage, { params });
  }
  goToMembershipManagement(params) {
    if (!params) params = {};
    this.navCtrl.push(MembershipManagementPage);
  } goToMembershipApply(params) {
    if (!params) params = {};
    this.navCtrl.push(MembershipApplyPage);
  } goToMembershipEdit(params) {
    if (!params) params = {};
    this.navCtrl.push(MembershipEditPage);
  } goToMemberList(params) {
    if (!params) params = {};
    this.navCtrl.push(MemberListPage);
  } goToSettlePermEventList(params) {
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventListPage);
  } goToSettlePermEventInfo(params) {
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventInfoPage);
  } goToEventCalendar(params) {
    if (!params) params = {};
    this.navCtrl.push(EventCalendarPage);
  } goToMemberEventRecord(params) {
    if (!params) params = {};
    this.navCtrl.push(MemberEventRecordPage);
  } goToMemberEventInfo(params) {
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  } goToEvnetInfo(params) {
    if (!params) params = {};
    this.navCtrl.push(EvnetInfoPage);
  } goToEventSuggestList(params) {
    if (!params) params = {};
    this.navCtrl.push(EventSuggestListPage);
  } goToEventAppliedList(params) {
    if (!params) params = {};
    this.navCtrl.push(EventAppliedListPage);
  } goToSystemManagement(params) {
    if (!params) params = {};
    this.navCtrl.push(SystemManagementPage);
  } goToEventManagement(params) {
    if (!params) params = {};
    this.navCtrl.push(EventManagementPage);
  } goToNewEvent(params) {
    if (!params) params = {};
    this.navCtrl.push(NewEventPage);
  } goToUpdateEvent(params) {
    if (!params) params = {};
    this.navCtrl.push(UpdateEventPage);
  } goToEventCategroryList(params) {
    if (!params) params = {};
    this.navCtrl.push(EventCategroryListPage);
  } goToEventCategorySetting(params) {
    if (!params) params = {};
    this.navCtrl.push(EventCategorySettingPage);
  } goToStaffSetting(params) {
    if (!params) params = {};
    this.navCtrl.push(StaffSettingPage);
  } goToStaffList(params) {
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  } goToStaffInfo(params) {
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  } goToStaffLevelList(params) {
    if (!params) params = {};
    this.navCtrl.push(StaffLevelListPage);
  } goToStaffLevel(params) {
    if (!params) params = {};
    this.navCtrl.push(StaffLevelPage);
  }

  getStroage() {
    this.storage.get('Login').then((val) => {
      this.log("my login hash" + val);
      if (val != null) {
        this.Login("Hash_Login", val, "","");
      }
      else {
        //  this.Login("Hash_Login","96a3be3cf272e017046d1b2674a52bd3","");
      }
    });
  }
  Login(type, info, info2,info3) {
    let loader = this.loadingCtrl.create({
      content: "登入中...請等候..."
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
          this.getEvents(this.Staff_Dept); // should be change not get dept
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
        }

      }

    }
    switch (type) {
      case "Hash_Login":
      case "Default_Login":
        var obj = { "Function": type, "info": info, "info2": info2,"info3": info3, "Passcode": "CheckME" };
        this.log(obj);
      break

    }
    //var obj = { "Username": this.Username, "Password": this.Password };
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
  }

  getEvents(location) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://101.78.175.101:8580/foodangel/Ajax_GetInfo.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.result == true) {

          console.info(obj.info);
          //for(var i = 0, count=10; i < obj.some.length; i++)

          for (var i = 0; i < obj.info.length; i++) {
            var result = obj.info[i];
            //this.log(Your);
            //this.log('++');
            this.Events.push({ "ID": result.ID, "Event_Name": result.Event_Name, "Room": result.Room });

          }




        } else if (obj.errorCode != null) {

          this.log(obj.errorCode);
        }



      }
    }

    var obj = { "Passcode": "GetInfo", "Function": "HomePerm" };
    this.log(obj);
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  log(info) {
    console.log(info);
  }
}
