import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';

@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html'
})
export class EventInfoPage {

  constructor(public navCtrl: NavController) {
  }
  goToEventSuggestList(params){
    if (!params) params = {};
    this.navCtrl.push(EventSuggestListPage);
  }goToEventAppliedList(params){
    if (!params) params = {};
    this.navCtrl.push(EventAppliedListPage);
  }goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }
}
