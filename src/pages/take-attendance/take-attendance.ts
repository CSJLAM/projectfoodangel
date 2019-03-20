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
  all:number;
  unch:number;
  che:number;
  lev:number;

  
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
      this.all=this.Event_Member_List.length;
      this.Attend_List = available;
      this.Attend_List = this.ajaxCall.transform_to_group(this.Attend_List, "Attend");
      //if(available[0].Member_ID.substring(0,1)=="F"){
        for(var a = 0; a<this.Attend_List.length;a++){
        console.log(this.Attend_List[a].list);
        switch(this.Attend_List[a].key){
          case "Checked":
          this.che=this.Attend_List[a].list.length;
          break;
          case "Leave":
          this.lev=this.Attend_List[a].list.length;
          break;
          case "Unchecked":
          this.unch=this.Attend_List[a].list.length;
          break;
        }
        this.Attend_List[a].list = this.ajaxCall.transform_to_group(this.Attend_List[a].list,"Member_ID_F");
        console.log(this.Attend_List[a].list);
        }
      //}

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
      //alert("NFC is not supported by your Device");
    });
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :( NFC STOP");

    this.nfc = null;
  }
  Click_DO(work){
    this.tagId=work;
    this.docheck();
  }
  docheck(auto=false) {
    //this.nfc=null;
    //const index = this.Event_Member_List.findIndex(member => member.Octopus === this.tagId);
    var index = this.Event_Member_List.findIndex(member => member.Octopus === this.tagId);
    if(index==-1){
     index = this.Event_Member_List.findIndex(member => member.Member_ID === this.tagId);
    }
    if(index==-1){
      index = this.Event_Member_List.findIndex(member => member.Chinese_Name === this.tagId);
    }
    if(index != -1 && this.Event_Member_List[index].Member_ID_F.substring(0,1)=="F"){
      var result = this.Event_Member_List.filter(member => member.Member_ID_F ==this.Event_Member_List[index].Member_ID_F);
      console.log(result);
      this.goToEventInfo(this.Event_Member_List[index],result,false);
    }else if (index != -1) {
      this.show = this.Event_Member_List[index];
      var result = this.Event_Member_List.filter(member => member.Member_ID_F ==this.Event_Member_List[index].Member_ID_F);
      this.goToEventInfo(this.Event_Member_List[index], result, auto);
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
            this.docheck(true);
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
    this.nfc=null;
    let id = this.temp.ID;

    this.navCtrl.push(ShowAttendPage, { params, params2, id, auto });
  }
}
