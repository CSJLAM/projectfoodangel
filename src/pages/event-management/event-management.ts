import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';
import { UpdateEventPage } from '../update-event/update-event';
import { EventCategroryListPage } from '../event-categrory-list/event-categrory-list';
import { EventCategorySettingPage } from '../event-category-setting/event-category-setting';
import { EventListPage } from '../event-list/event-list';

@Component({
  selector: 'page-event-management',
  templateUrl: 'event-management.html'
})
export class EventManagementPage {
apple = 0;
  constructor(public navCtrl: NavController) {
  
  }
  goToNewEvent(params){
    if (!params) params = {};
     
    this.navCtrl.push(NewEventPage);
  }
  goToEventList(){
    
    this.navCtrl.push(EventListPage);
  }
  goToUpdateEvent(params){
    if (!params) params = {};
    this.navCtrl.push(UpdateEventPage);
  }
  goToEventCategroryList(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategroryListPage);
  }
  goToEventCategorySetting(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategorySettingPage);
  }
}
