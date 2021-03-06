import { Component } from '@angular/core';
import { NavController,LoadingController,  AlertController,} from 'ionic-angular';
import { NFC} from '@ionic-native/nfc';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'

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
  member_types:any="";
  Member: string[] = ['Octopus','Gender','Member_Type','Chinese_Name','English_Name','DOB','HKID',
                'Occupation','Marriage','E_Num_Son','Year_In_HK','Contact_1','Contact_2',
                'E_Life_Tgt','Address','Gov_CSSA','Family_Income','Elderly_Income','Old_Age_Allowance',
                'Disability_Allowance','Pension','Family_Support','Photo_Auth','Declaration_1','Declaration_2','Remark','Reason'];
  EM_Contact:any[] =[{"Name":"","Relationship":"","Phone":""},{"Name":"","Relationship":"","Phone":""}];
  Family_Members: any[] = [];
  PermEventList:any;

  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,private nfc2: NFC,public loadingCtrl: LoadingController,public alertCtrl: AlertController,) {
    
    this.Fildes_Set();
    //this.Member['Octopus']="999999";
    
    //this.EM_Contact[0]['YO']="YOYOYO";
    //this.EM_Contact[1]['YO']="YOYOYO2222";
    //this.Family_Members.push({"ID":"Q","Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
    this.Family_Members.push({"ID":"D"+Date.now(),"Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
    this.log(this.Family_Members);
    
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    
  }
  ionViewDidEnter() {
    this.ajaxCall.Member_function_Call("List_Member_Type").then(result =>{
      this.member_types=result;
      this.Member['Member_Type']=this.member_types[0].ID;
      this.Mem_type_change();
    });
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
  Mem_type_change(){
    this.ajaxCall.Member_function_Call("List_Member_Type_Perm_Event_Type",this.Member['Member_Type']).then(result=>{
      this.ajaxCall.Member_function_Call("Apply_Get_Perm_Event",result[0].ID).then(result1=>{
        this.PermEventList=result1;
        console.log(this.PermEventList);
      });
    });
  }
  
  Apply(){
    let obj_Member ={ 'Octopus':this.Member['Octopus'],'Gender':this.Member['Gender'],
    'Member_Type':this.Member['Member_Type'],'Chinese_Name':this.Member['Chinese_Name'],
    'English_Name':this.Member['English_Name'],'DOB':this.Member['DOB'],'HKID':this.Member['HKID'],
    'Occupation':this.Member['Occupation'],'Marriage':this.Member['Marriage'],'E_Num_Son':this.Member['E_Num_Son'],
    'Year_In_HK':this.Member['Year_In_HK'],'Contact_1':this.Member['Contact_1'],'Contact_2':this.Member['Contact_2'],
    'E_Life_Tgt':this.Member['E_Life_Tgt'],'Address':this.Member['Address'],'Gov_CSSA':this.Member['Gov_CSSA'],
    'Family_Income':this.Member['Family_Income'],'Elderly_Income':this.Member['Elderly_Income'],
    'Old_Age_Allowance':this.Member['Old_Age_Allowance'],'Disability_Allowance':this.Member['Disability_Allowance'],
    'Pension':this.Member['Pension'],'Family_Support':this.Member['Family_Support'],'Photo_Auth':this.Member['Photo_Auth'],
    'Declaration_1':this.Member['Declaration_1'],'Declaration_2':this.Member['Declaration_2'],'Remark':this.Member['Remark'],'Reason':this.Member['Reason']};
    console.log(obj_Member);
    this.ajaxCall.Member_function_Call("Apply_New_Member",obj_Member,this.EM_Contact,this.Family_Members,this.PermEventList).then(result=>{
      console.log(result);
      if(result==true){
        this.navCtrl.pop();
      }
    });
    // console.log(JSON.stringify(this.EM_Contact));
    // console.log(JSON.stringify(this.PermEventList));
    // this.ajaxCall.Member_function_Call("Testing",this.PermEventList).then(result=>{
    // });

  }
  Fildes_Set(){
    this.Member['Octopus']="";this.Member['Gender']="";this.Member['Chinese_Name']="";this.Member['English_Name']="";this.Member['DOB']="";this.Member['HKID']="";
    this.Member['Occupation']="";this.Member['Marriage']="";this.Member['E_Num_Son']="";this.Member['Year_In_HK']="";this.Member['Contact_1']="";this.Member['Contact_2']="";
    this.Member['E_Life_Tgt']="";this.Member['Address']="";this.Member['Gov_CSSA']="";this.Member['Family_Income']="";this.Member['Elderly_Income']="";this.Member['Old_Age_Allowance']="";
    this.Member['Disability_Allowance']="";this.Member['Pension']="";this.Member['Family_Support']="";
    this.Member['Photo_Auth']=false;this.Member['Declaration_1']=false;this.Member['Declaration_2']=false;this.Member['Reason']="";this.Member['Remark']="";
  }
  log(info){
    console.log(info);
  }
  
}
