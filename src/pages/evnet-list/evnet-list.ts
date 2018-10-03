import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateEventPage } from '../update-event/update-event';

@Component({
  selector: 'page-evnet-list',
  templateUrl: 'evnet-list.html'
})
export class EvnetListPage {

  constructor(public navCtrl: NavController) {
  }
  goToUpdateEvent(params){
    if (!params) params = {};
    this.navCtrl.push(UpdateEventPage);
  }
}
