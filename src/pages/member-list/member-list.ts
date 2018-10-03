import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MembershipEditPage } from '../membership-edit/membership-edit';

@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html'
})
export class MemberListPage {

  constructor(public navCtrl: NavController) {
  }
  goToMembershipEdit(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipEditPage);
  }
}
