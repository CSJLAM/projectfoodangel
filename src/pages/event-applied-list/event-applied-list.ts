import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';

@Component({
  selector: 'page-event-applied-list',
  templateUrl: 'event-applied-list.html'
})
export class EventAppliedListPage {

  constructor(public navCtrl: NavController) {
  }
  goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }
}
