import { Component } from '@angular/core';
import { NavController ,NavParams } from 'ionic-angular';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call';
import { MembershipEditPage } from '../membership-edit/membership-edit';
import {SettlePermEventListPage} from '../settle-perm-event-list/settle-perm-event-list';
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html'
})
export class MemberInfoPage {
Member:any;
Applyed_List:any;
Pass_List:any;
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,public navParams: NavParams,) {
    this.Member = this.navParams.data.params;
    
  }
  ionViewDidEnter() {
    
    this.ajaxCall.Member_function_Call("List_Applyed_Event",this.Member.Member_ID).then(result =>{
      this.Applyed_List=result;
      this.ajaxCall.Member_function_Call("List_Pass_Event",this.Member.Member_ID).then(result =>{
        this.Pass_List=result;
      });
    });
    
   }
   goToMemberInfo(params){
     this.navCtrl.push(MembershipEditPage,{params});
   }
   goToSettle(params){
     //console.log(params);
    this.navCtrl.push(SettlePermEventListPage,{params});
  }
   
  
}
