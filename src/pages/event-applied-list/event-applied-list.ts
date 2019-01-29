import { Component } from '@angular/core';
import {  NavController ,NavParams } from 'ionic-angular';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';

@Component({
  selector: 'page-event-applied-list',
  templateUrl: 'event-applied-list.html'
})
export class EventAppliedListPage {
  Event:any;
  Confirm_List:any;
  Waiting_List:any;
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,public navParams: NavParams,) {
    this.Event = this.navParams.data.params;
  }
  ionViewDidEnter() {
    
    this.ajaxCall.getEvents_Call("","Get_Confirm_List",this.Event.Event_Connect).then(result=>{
      console.log(result);
      this.Confirm_List=result;
    });
    this.ajaxCall.getEvents_Call("","Get_Waiting_List",this.Event.Event_Connect).then(result=>{
      console.log(result);
      this.Waiting_List=result;
    });
    
   }
  goToMemberEventInfo(params){
    console.log(params);
    this.navCtrl.push(MemberEventInfoPage,{params});
  }
}
