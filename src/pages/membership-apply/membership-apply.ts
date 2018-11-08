import { Component } from '@angular/core';
import { NavController,LoadingController,  AlertController,} from 'ionic-angular';
import { NFC} from '@ionic-native/nfc';
import { StaffLevelPage } from '../staff-level/staff-level';
@Component({
  selector: 'page-membership-apply',
  templateUrl: 'membership-apply.html'
})
export class MembershipApplyPage  {
  nfc:NFC;
  readonly:boolean= true;
  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  inputoctopus: number=-2;
  Page: number = 0;
  Member: any[] = ['Octopus','Gender','Member_Type','Chinese_Name','English_Name','DOB','HKID',
                'Occupation','Marriage','E_Num_Son','Year_In_HK','Contact_1','Contact_2',
                'E_Life_Tgt','Address'];
  EM_Contact:any[] =[{"Name":"","Relationship":"","Phone":""},{"Name":"","Relationship":"","Phone":""}];
  Family_Members: any[] = [];

  constructor(public navCtrl: NavController,private nfc2: NFC,public loadingCtrl: LoadingController,public alertCtrl: AlertController,) {
    
    
    this.Member['Octopus']="999999";
    
    //this.EM_Contact[0]['YO']="YOYOYO";
    //this.EM_Contact[1]['YO']="YOYOYO2222";
    //this.Family_Members.push({"ID":"Q","Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
    this.Family_Members.push({"ID":"D"+Date.now(),"Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
    this.log(this.Family_Members);
    
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    
  }
  goToStaffLevel(params) {
    if (!params) params = {};
    this.navCtrl.push(StaffLevelPage);
  }
  setinput(data){
    this.log(data);
    this.nfc=this.nfc2;
    this.scandata();
    this.inputoctopus=data;
  }
  setoctopus(){
    if(this.inputoctopus==-1){
      alert("SCANNED");
      this.Member['Octopus']=this.tagId;
      this.nfc=null;
    }else if(this.inputoctopus>=0){
      alert("SCANNED");
      this.Family_Members[this.inputoctopus].Octopus=this.tagId;
      this.nfc=null;
    }else{
      alert("DISABLED?");
    }
    this.inputoctopus=-2;
  }
  Rm_Fam(ID){
    this.log(ID);
    this.Family_Members.splice(this.Family_Members.findIndex(e => e.ID === ID),1);
    this.log(this.Family_Members);
  }
  Add_Fam(){
    //this.Family_Members.push({"ID":this.Family_Members[this.Family_Members.length-1].ID+Date.now(),"Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
    this.Family_Members.push({"ID":"D"+Date.now(),"Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
  }
  Pev_Page(){
    if(this.Page>0){
      this.Page-=1;
    }
   this.log("The application form page"+this.Page);
  }
  Next_Page(){
    if(this.Page<6){
      this.Page+=1;
    }this.log("The application form page"+this.Page);
   
  }
  scandata(){
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      alert("NFC is not supported by your Device");
    });
  }
  resetScanData() {
    this.granted = false;
    this.scanned = false;
    this.tagId = "";
  }
  readNFC(){
    this.nfc.addTagDiscoveredListener()
        .subscribe(data => {
            let tagId= this.nfc.bytesToString(data.tag.id);
            this.tagId = tagId;
            console.log("tag data", tagId);
            
          
          
        },
        err => {
        
        });
     
  }
  addListenNFC() {

     this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        if (tagId) {
          this.tagId = tagId;
          this.scanned = true;
          this.setoctopus();
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
  log(info){
    console.log(info);
  }
  
}
