import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MembershipApplyPage } from '../membership-apply/membership-apply';
import { MembershipEditPage } from '../membership-edit/membership-edit';
import { MemberListPage } from '../member-list/member-list';
import { SettlePermEventListPage } from '../settle-perm-event-list/settle-perm-event-list';
import { SettlePermEventInfoPage } from '../settle-perm-event-info/settle-perm-event-info';

@Component({
  selector: 'page-membership-management',
  templateUrl: 'membership-management.html'
})
export class MembershipManagementPage {

  constructor(public navCtrl: NavController) {
  }
  goToMembershipApply(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipApplyPage);
  }goToMembershipEdit(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipEditPage);
  }goToMemberList(params){
    if (!params) params = {};
    this.navCtrl.push(MemberListPage);
  }goToSettlePermEventList(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventListPage);
  }goToSettlePermEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventInfoPage);
  }
}
