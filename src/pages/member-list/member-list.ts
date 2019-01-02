import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberInfoPage } from '../member-info/member-info';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'
@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html'
})
export class MemberListPage {
  Select_type:any="";
  member_types:any="";
  Member_List:any=[];
  

  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController) {
  }
  ionViewDidEnter() {
    
   this.ajaxCall.Member_function_Call("List_Member_Type").then(result =>{
     this.member_types=result;
     this.Select_type=this.member_types[0].ID;
   });
  }
  Mem_type_change(){
    this.ajaxCall.Member_function_Call("List_Member",this.Select_type).then(lresult =>{
      // console.log(lresult);
      this.Member_List=lresult;
    });
  }
  goToMemberInfo(params){
    this.navCtrl.push(MemberInfoPage,{params});
  }
}
