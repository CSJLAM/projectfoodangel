import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventCategroryListPage } from '../event-categrory-list/event-categrory-list';
import { EventCategorySettingPage } from '../event-category-setting/event-category-setting';

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
