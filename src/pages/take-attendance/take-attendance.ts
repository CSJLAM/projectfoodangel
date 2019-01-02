import { Component } from '@angular/core';
import { NavController,NavParams ,LoadingController } from 'ionic-angular';
import { NFC} from '@ionic-native/nfc';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-take-attendance',
  templateUrl: 'take-attendance.html'
})
export class TakeAttendancePage {
  temp: any;
  Attend_List: any;
  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  constructor(private ajaxCall: AjaxCallProvider,public navParams: NavParams, private storage: Storage,public navCtrl: NavController,private nfc: NFC) {
    this.temp = this.navParams.data.params;

  }
  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }

  ionViewDidEnter() {
    this.temp = this.navParams.data.params;
    console.log(this.temp.ID);
    this.ajaxCall.getEvents_Call("","Load_Event_Attend",this.temp.ID).then(available => {
      //   console.log("available");
      //  console.log(available);
       this.Attend_List=available;
      this.Attend_List=this.ajaxCall.transform_to_group(this.Attend_List,"Attend");
      
      console.log(this.Attend_List);
      //  console.log("available");
    });
    this.resetScanData();
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      //alert("NFC is not supported by your Device");
    });
    
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    this.nfc=null;
  }
docheck(){
  this.ajaxCall.AddEvents_Call("Attened_Evnet",this.tagId).then( result =>{
    console.log(result);
    alert(result);
  });
}
  addListenNFC() {

    this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        if (tagId) {
          this.tagId = tagId;
          this.scanned = true;
          this.docheck();
          alert("SCANNED");
       
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

}
