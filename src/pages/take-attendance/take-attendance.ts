import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import { Storage } from '@ionic/storage';
import { ShowAttendPage } from '../show-attend/show-attend';
import { ControllerProvider } from '../../providers/controller/controller';
@Component({
  selector: 'page-take-attendance',
  templateUrl: 'take-attendance.html'
})
export class TakeAttendancePage {
  nfc: NFC
  nfc_check: boolean;
  temp: any;
  Attend_List: any;
  Event_Member_List: any;
  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  show: any;
  constructor(private controller: ControllerProvider, private ajaxCall: AjaxCallProvider, public navParams: NavParams, private storage: Storage, public navCtrl: NavController, private nfc2: NFC) {
    this.temp = this.navParams.data.params;
    this.nfc_check = false;
  }
  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }

  ionViewDidEnter() {
    this.temp = this.navParams.data.params;
    console.log(this.temp.ID);
    this.ajaxCall.getEvents_Call("", "Load_Event_Attend", this.temp.ID).then(available => {
      //   console.log("available");
      //  console.log(available);
      this.Event_Member_List = available;
      this.Attend_List = available;
      this.Attend_List = this.ajaxCall.transform_to_group(this.Attend_List, "Attend");

      console.log(this.Attend_List);
      //  console.log("available");
    });
    this.resetScanData();
    this.nfc = this.nfc2;
    if (this.nfc_check == false) {
      this.scandata();
      // this.nfc.enabled().then((resolve) => {
      //   this.nfc_check = true;
      //   this.addListenNFC();
      // }).catch((reject) => {
      //   //alert("NFC is not supported by your Device");
      // });
    }
  }
  scandata(){
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
      this.nfc_check = true;
    }).catch((reject) => {
      alert("NFC is not supported by your Device");
    });
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :( NFC STOP");

    this.nfc = null;
  }
  docheck() {
    //this.nfc=null;
    const index = this.Event_Member_List.findIndex(member => member.Octopus === this.tagId);
    if (index != -1) {
      this.show = this.Event_Member_List[index];
      this.goToEventInfo(this.Event_Member_List[index], "", true);
    } else {
      this.controller.showToast("你沒有參加是次活動！");
      alert("你沒有參加是次活動！");
    }
    //this.nfc=this.nfc2;
    //this.scandata();
    // console.log("=======");
    // console.log(index);
    // console.log("--------");
    // this.show=this.Attend_List[index];
    // this.ajaxCall.AddEvents_Call("Attened_Evnet",this.tagId).then( result =>{
    //   console.log(result);
    //   alert(result);
    // });
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

  sesReadNFC(data): void {

  }

  failNFC(err) {
    alert("Error while reading: Please Retry");
  }
  goToEventInfo(params, params2 = "", auto = false) {
    let id = this.temp.ID;

    this.navCtrl.push(ShowAttendPage, { params, params2, id, auto });
  }
}
