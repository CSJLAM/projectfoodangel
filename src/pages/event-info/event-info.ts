import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, } from 'ionic-angular';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import { NFC } from '@ionic-native/nfc';
import { ControllerProvider } from '../../providers/controller/controller';
import { EventMultiApplyPage } from '../event-multi-apply/event-multi-apply';


@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html'
})
export class EventInfoPage {
  nfc: NFC
  nfc_check: boolean;
  Event: any;
  EventsInfo: any = [];
  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  Member_data: any;
  constructor(private controller: ControllerProvider, private ajaxCall: AjaxCallProvider, public navCtrl: NavController, public navParams: NavParams, private nfc2: NFC, public alertCtrl: AlertController, ) {
    this.Event = this.navParams.data.params;
    this.nfc_check = false;
  }
  ionViewDidEnter() {

    this.ajaxCall.getEvents_Call("", "Get_event_info", this.Event.ID).then(result => {
      console.log(result);
      this.EventsInfo = result;
    });
    this.resetScanData();
    this.nfc = this.nfc2;
    if (this.nfc_check == false) {
      this.nfc.enabled().then((resolve) => {
        this.nfc_check = true;
        this.addListenNFC();
      }).catch((reject) => {
        //alert("NFC is not supported by your Device");
      });
    }
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :( NFC STOP");

    this.nfc = null;
  }
  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }

  addListenNFC() {

    this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        if (tagId) {
          this.tagId = tagId;
          this.scanned = true;
          this.docheck();
          //alert("SCANNED");
          // console.log("SCANNED");
          this.resetScanData();

          //alert(tagId);
          // only testing data consider to ask web api for access
          this.granted = [
            "7d3c6179"
          ].indexOf(tagId) != -1;

        } else {
          alert('NFC_NOT_DETECTED');
        }

      }
    });
  }
  docheck() {
    this.ajaxCall.Member_function_Call("Get_Member_Info_by_Octopus", this.tagId).then(result => {
      this.Member_data = result;
      if (this.Member_data != undefined) {
        if (this.Member_data['Member_Type'] == 1) {
          const msg = "會員：" + this.Member_data['Chinese_Name'];
          //alert(this.Member_data['Member_ID']);
          let prompt = this.alertCtrl.create({
            title: '報名活動?',
            message: msg,

            buttons: [
              {
                text: '取消',
                handler: data => {

                }
              },
              {
                text: '確認',
                handler: data => {
                  this.ajaxCall.AddEvents_Call("Apply_Event", this.EventsInfo, this.Member_data).then(result1 => {

                  });
                  //this.ajaxCall.AddEvents_Call("Waiting_to_confirm",this.Event.ID).then(result=>{

                  // });
                }
              }
            ]
          });
          prompt.present();
        }
      }
      //fam ver
      //this.ajaxCall.Member_function_Call("Get_Fam_Info_by_Octopus",this.tagId).then(result=>{});
    });
    this.ajaxCall.Member_function_Call("Get_Member_Family_Info_by_Octopus", this.tagId).then(result3 => {
      this.Member_data = result3;
      //alert(this.Member_data[0]);
      if (this.Member_data[0] != null) {
        this.goToMultiApply(this.Member_data, this.EventsInfo);
      }
    });



  }
  sesReadNFC(data): void {

  }

  failNFC(err) {
    alert("Error while reading: Please Retry");
  }
  goToEventSuggestList() {
    let params = this.EventsInfo;
    this.navCtrl.push(EventSuggestListPage, { params });
  }
  goToEventAppliedList() {
    let params = this.EventsInfo;
    this.navCtrl.push(EventAppliedListPage, { params });
  }
  goToMemberEventInfo(params) {
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }
  goToMultiApply(params, params2) {
    this.navCtrl.push(EventMultiApplyPage, { params, params2 });
  }
}
