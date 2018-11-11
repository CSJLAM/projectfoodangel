import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController, AlertController, LoadingController,} from 'ionic-angular';
import { MemberEventRecordPage } from '../member-event-record/member-event-record';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';
import { EvnetInfoPage } from '../evnet-info/evnet-info';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-event-calendar',
  templateUrl: 'event-calendar.html'
})
export class EventCalendarPage {
  public Events: any[] = [];
  public isSignedIn: string = null;
  public Name: string = null;
  public Staff_ID: string = null;
  public Staff_Hash: String = null;
  public Staff_Dept: String = null;
  public Month: String = (new Date().getMonth()+1).toString();
  public counting: "";
  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController, public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public platform: Platform) {
  }
  ionViewDidEnter() {
    this.Events = [];
    this.isSignedIn = null;
    this.Name= null;
    this.Staff_ID = null;
    this.Staff_Hash = null;
    this.Staff_Dept = null;
    this.getStroage();
    
  }
  goToMemberEventRecord(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventRecordPage);
  }goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }goToEvnetInfo(params){
    if (!params) params = {};
    this.navCtrl.push(EvnetInfoPage);
  }goToEventSuggestList(params){
    if (!params) params = {};
    this.navCtrl.push(EventSuggestListPage);
  }goToEventAppliedList(params){
    if (!params) params = {};
    this.navCtrl.push(EventAppliedListPage);
  }
  getStroage() {
    this.storage.get('Login').then((val) => {
      this.log("my login hash" + val);
      if (val != null) {
        this.Account("Hash_Login", val, "","");
      }
      else {
        //  this.Login("Hash_Login","96a3be3cf272e017046d1b2674a52bd3","");
      }
    });
  }
  transform_to_date_group(value: any, groupByKey: string) {
    const events: any[] = [];
    const groupedElements: any = {};

    value.forEach((obj: any) => {
      if (!(obj[groupByKey] in groupedElements)) {
        groupedElements[obj[groupByKey]] = [];
      }
      groupedElements[obj[groupByKey]].push(obj);
    });

    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        events.push({
          key: prop,
          list: groupedElements[prop]
        });
      }
    }

    return events;
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
            this.Events.push({ "ID": result.ID, "Event_Name": result.Event_Name, "Room": result.Event_Location, "Start_Date":result.Start_Date });

          }
          this.Events=this.transform_to_date_group(this.Events,"Start_Date");
          console.log(this.Events);




        } else if (obj.errorCode != null) {

          this.log(obj.errorCode);
        }



      }
    }

    var obj = { "Passcode": "GetInfo", "Function": "Calendar" };
    this.log(obj);
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }

  Account(type, info, info2, info3) {

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
              this.getEvents(1);
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
