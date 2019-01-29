import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { SettlePermEventInfoPage } from '../settle-perm-event-info/settle-perm-event-info';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
@Component({
  selector: 'page-settle-perm-event-list',
  templateUrl: 'settle-perm-event-list.html'
})
export class SettlePermEventListPage {
  MemberID:any;
  temp:any;
  Member:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ajaxCall: AjaxCallProvider,) {
    this.MemberID= this.navParams.data.MemberID;this.ajaxCall.Member_function_Call("Get_Member_Info_by_ID",this.MemberID).then(result=>{
      this.temp=result;
      this.Member=this.temp;
    this.ajaxCall.Member_function_Call("List_Member_Type_Perm_Event_Type",this.Member['Member_Type']).then(result=>{
      this.ajaxCall.Member_function_Call("Get_Member_Perm_Event",this.Member['Member_ID'],result[0].ID).then(service=>{
        //this.PermEventList=service;
      });
    });
  });
  }
  goToSettlePermEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventInfoPage);
  }
}
