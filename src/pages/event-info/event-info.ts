import { Component } from '@angular/core';
import { NavController ,NavParams ,} from 'ionic-angular';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call';


@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html'
})
export class EventInfoPage {
  Event:any;
  EventsInfo:any=[];
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,public navParams: NavParams,) {
    this.Event = this.navParams.data.params;
  }
  ionViewDidEnter() {
    
    this.ajaxCall.getEvents_Call("","Get_event_info",this.Event.ID).then(result=>{
      console.log(result);
      this.EventsInfo=result;
    });
    
   }
  goToEventSuggestList(){
    let params=this.EventsInfo;
    this.navCtrl.push(EventSuggestListPage,{params});
  }
  goToEventAppliedList(){
    let params=this.EventsInfo;
    this.navCtrl.push(EventAppliedListPage,{params});
  }
  goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }
}
