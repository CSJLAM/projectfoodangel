import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-membership-apply',
  templateUrl: 'membership-apply.html'
})
export class MembershipApplyPage {
  Page: number = 0;
  Member: any[] = ['Octopus','Gender','Member_Type','Chinese_Name','English_Name','DOB','HKID',
                'Occupation','Marriage','E_Num_Son','Year_In_HK','Contact_1','Contact_2',
                'E_Life_Tgt','Address'];
  EM_Contact:any[] =[];

public Family_Members: any[] = [];
  constructor(public navCtrl: NavController) {
    this.Member['Octopus']="999999";
    this.EM_Contact[0]['YO']="YOYOYO";
    this.EM_Contact[1]['YO']="YOYOYO2222";
    this.Family_Members.push({  });
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
  log(info){
    console.log(info);
  }
  
}
