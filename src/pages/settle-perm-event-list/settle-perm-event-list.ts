import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettlePermEventInfoPage } from '../settle-perm-event-info/settle-perm-event-info';

@Component({
  selector: 'page-settle-perm-event-list',
  templateUrl: 'settle-perm-event-list.html'
})
export class SettlePermEventListPage {

  constructor(public navCtrl: NavController) {
  }
  goToSettlePermEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventInfoPage);
  }
}
