import { Component } from '@angular/core';
import { NavController,LoadingController,  AlertController,NavParams} from 'ionic-angular';
import { NFC} from '@ionic-native/nfc';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'

@Component({
  selector: 'page-membership-edit',
  templateUrl: 'membership-edit.html'
})
export class MembershipEditPage {
  data:any;
  temp:any;
  nfc:NFC;
  delete_fam:boolean=false;
  readonly:boolean= true;
  granted: boolean;
  denied: boolean;
  scanned: boolean;
  tagId: string;
  inputoctopus: number=-2;
  Page: number = 0;
  member_types:any="";
  Member: string[] = ['Member_ID','Octopus','Gender','Member_Type','Chinese_Name','English_Name','DOB','HKID',
                'Occupation','Marriage','E_Num_Son','Year_In_HK','Contact_1','Contact_2',
                'E_Life_Tgt','Address','Gov_CSSA','Family_Income','Elderly_Income','Old_Age_Allowance',
                'Disability_Allowance','Pension','Family_Support','Photo_Auth','Declaration_1','Declaration_2','Remark','Reason'];
  //EM_Contact:any[] =[{"Name":"","Relationship":"","Phone":""},{"Name":"","Relationship":"","Phone":""}];
  EM_Contact:any[] =[];
  Family_Members: any[] = [];
  PermEventList:any;
  member_types_o:any="";
  Member_o: string[] = ['Octopus','Gender','Member_Type','Chinese_Name','English_Name','DOB','HKID',
                'Occupation','Marriage','E_Num_Son','Year_In_HK','Contact_1','Contact_2',
                'E_Life_Tgt','Address','Gov_CSSA','Family_Income','Elderly_Income','Old_Age_Allowance',
                'Disability_Allowance','Pension','Family_Support','Photo_Auth','Declaration_1','Declaration_2','Remark','Reason'];
  //EM_Contact_o:any[] =[{"Name":"","Relationship":"","Phone":""},{"Name":"","Relationship":"","Phone":""}];
  EM_Contact_o:any[] = [];
  Family_Members_o: any[] = [];
  PermEventList_o:any;


  constructor(
    private ajaxCall: AjaxCallProvider,public navCtrl: NavController,private nfc2: NFC,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public navParams: NavParams,
  ) {
    this.data = this.navParams.data.params;
   
    
    // this.Family_Members.push({"ID":"D"+Date.now(),"Octopus":"","Chinese_Name":"","English_Name":"","Gender":"","Relationship":"","Live_Together":"","DOB":"","Career":"","Income":"","Remark":""});
    // this.log(this.Family_Members);
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    
    
  }
  ionViewDidEnter() {
    this.ajaxCall.Member_function_Call("List_Member_Type").then(result =>{
      this.member_types=result;
      //this.Member['Member_Type']=this.member_types[0].ID;
      //this.Mem_type_change();
      this.ajaxCall.Member_function_Call("Get_Member_Info_by_ID",this.data).then(result=>{
        this.temp=result;
        if(this.temp['Declaration_1']==1){
          this.temp['Declaration_1']=true;
        }
        if(this.temp['Declaration_2']==1){
          this.temp['Declaration_2']=true;
        }
        if(this.temp['Photo_Auth']==1){
          this.temp['Photo_Auth']=true;
        }
        this.Member=this.temp;
        this.Member_o=this.temp;
        //this.Mem_type_change();
        this.ajaxCall.Member_function_Call("Get_Member_Family_Info_by_ID",this.Member['Member_ID']).then(family=>{
          if(this.Member['Member_Type']==2){
            this.delete_fam=true;
          }
          this.temp=family;
           this.Family_Members=this.temp;
           this.Family_Members_o=this.temp;
        });
        this.ajaxCall.Member_function_Call("Get_Member_Urgent_Info_by_ID",this.Member['Member_ID']).then(urgent=>{
          this.temp=urgent;
          this.EM_Contact=this.temp;
          this.EM_Contact_o=this.temp;
        });
        this.ajaxCall.Member_function_Call("List_Member_Type_Perm_Event_Type",this.Member['Member_Type']).then(result=>{
          this.ajaxCall.Member_function_Call("Get_Member_Perm_Event",this.Member['Member_ID'],result[0].ID).then(service=>{
            this.PermEventList=service;
            this.PermEventList_o=service;
          });
        });
      });
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
    console.log("APPLY");
    this.ajaxCall.Member_function_Call("Update_Member",this.Member,this.EM_Contact,this.Family_Members,this.PermEventList).then(result=>{
        console.log(result);
        if(result==true){
          this.navCtrl.pop();
        }
      });
    // console.log(this.PermEventList==this.PermEventList_o);
    // console.log(this.PermEventList);
    // console.log(this.PermEventList_o);
    // let obj_Member ={ 'Octopus':this.Member['Octopus'],'Gender':this.Member['Gender'],
    // 'Member_Type':this.Member['Member_Type'],'Chinese_Name':this.Member['Chinese_Name'],
    // 'English_Name':this.Member['English_Name'],'DOB':this.Member['DOB'],'HKID':this.Member['HKID'],
    // 'Occupation':this.Member['Occupation'],'Marriage':this.Member['Marriage'],'E_Num_Son':this.Member['E_Num_Son'],
    // 'Year_In_HK':this.Member['Year_In_HK'],'Contact_1':this.Member['Contact_1'],'Contact_2':this.Member['Contact_2'],
    // 'E_Life_Tgt':this.Member['E_Life_Tgt'],'Address':this.Member['Address'],'Gov_CSSA':this.Member['Gov_CSSA'],
    // 'Family_Income':this.Member['Family_Income'],'Elderly_Income':this.Member['Elderly_Income'],
    // 'Old_Age_Allowance':this.Member['Old_Age_Allowance'],'Disability_Allowance':this.Member['Disability_Allowance'],
    // 'Pension':this.Member['Pension'],'Family_Support':this.Member['Family_Support'],'Photo_Auth':this.Member['Photo_Auth'],
    // 'Declaration_1':this.Member['Declaration_1'],'Declaration_2':this.Member['Declaration_2']};
    // console.log(obj_Member);
    // this.ajaxCall.Member_function_Call("Apply_New_Member",obj_Member,this.EM_Contact,this.Family_Members,this.PermEventList).then(result=>{
    //   console.log(result);
    //   if(result==true){
    //     this.navCtrl.pop();
    //   }
    // });
    // console.log(JSON.stringify(this.EM_Contact));
    // console.log(JSON.stringify(this.PermEventList));
    // this.ajaxCall.Member_function_Call("Testing",this.PermEventList).then(result=>{
    // });

  }
  Reset(){
    this.Fildes_Set();
    this.ionViewDidEnter();
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
