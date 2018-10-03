import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberEventRecordPage } from '../member-event-record/member-event-record';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';
import { EvnetInfoPage } from '../evnet-info/evnet-info';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';

@Component({
  selector: 'page-event-calendar',
  templateUrl: 'event-calendar.html'
})
export class EventCalendarPage {

  constructor(public navCtrl: NavController) {
  }
  goToMemberEventRecord(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventRecordPage);
  }goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }goToEvnetInfo(params){
    if (!params) params = {};
    this.navCtrl.push(EvnetInfoPage);
  }goToEventSuggestList(params){
    if (!params) params = {};
    this.navCtrl.push(EventSuggestListPage);
  }goToEventAppliedList(params){
    if (!params) params = {};
    this.navCtrl.push(EventAppliedListPage);
  }
}
