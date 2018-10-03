import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventCategroryListPage } from '../event-categrory-list/event-categrory-list';


@Component({
  selector: 'page-event-category-setting',
  templateUrl: 'event-category-setting.html'
})
export class EventCategorySettingPage {

  constructor(public navCtrl: NavController) {
  }
  goToEventCategroryList(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategroryListPage);
  }goToEventCategorySetting(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategorySettingPage);
  }
}
