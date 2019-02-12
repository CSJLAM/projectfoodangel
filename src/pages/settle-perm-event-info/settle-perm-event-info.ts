import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';

@Component({
  selector: 'page-settle-perm-event-info',
  templateUrl: 'settle-perm-event-info.html'
})
export class SettlePermEventInfoPage {
  Member:any;
  Event:any;
  constructor(public navCtrl: NavController,public navParams: NavParams,) {
    this.Member= this.navParams.data.params;
    this.Event = this.navParams.data.params2;
  }
  
}
