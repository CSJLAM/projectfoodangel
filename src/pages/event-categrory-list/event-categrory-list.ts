import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventCategorySettingPage } from '../event-category-setting/event-category-setting';


@Component({
  selector: 'page-event-categrory-list',
  templateUrl: 'event-categrory-list.html'
})
export class EventCategroryListPage {

  constructor(public navCtrl: NavController) {
  }
  goToEventCategorySetting(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategorySettingPage);
  }goToEventCategroryList(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategroryListPage);
  }
}
