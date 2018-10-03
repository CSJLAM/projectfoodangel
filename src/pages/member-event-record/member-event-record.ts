import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';

@Component({
  selector: 'page-member-event-record',
  templateUrl: 'member-event-record.html'
})
export class MemberEventRecordPage {

  constructor(public navCtrl: NavController) {
  }
  goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }
}
