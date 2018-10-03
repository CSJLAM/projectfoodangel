import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventManagementPage } from '../event-management/event-management';
import { NewEventPage } from '../new-event/new-event';
import { UpdateEventPage } from '../update-event/update-event';
import { EventCategroryListPage } from '../event-categrory-list/event-categrory-list';
import { EventCategorySettingPage } from '../event-category-setting/event-category-setting';
import { StaffSettingPage } from '../staff-setting/staff-setting';
import { StaffListPage } from '../staff-list/staff-list';
import { StaffInfoPage } from '../staff-info/staff-info';
import { StaffLevelListPage } from '../staff-level-list/staff-level-list';
import { StaffLevelPage } from '../staff-level/staff-level';

@Component({
  selector: 'page-system-management',
  templateUrl: 'system-management.html'
})
export class SystemManagementPage {

  constructor(public navCtrl: NavController) {
  }
  goToEventManagement(params){
    if (!params) params = {};
    this.navCtrl.push(EventManagementPage);
  }goToNewEvent(params){
    if (!params) params = {};
    this.navCtrl.push(NewEventPage);
  }goToUpdateEvent(params){
    if (!params) params = {};
    this.navCtrl.push(UpdateEventPage);
  }goToEventCategroryList(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategroryListPage);
  }goToEventCategorySetting(params){
    if (!params) params = {};
    this.navCtrl.push(EventCategorySettingPage);
  }goToStaffSetting(params){
    if (!params) params = {};
    this.navCtrl.push(StaffSettingPage);
  }goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  }goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  }goToStaffLevelList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffLevelListPage);
  }goToStaffLevel(params){
    if (!params) params = {};
    this.navCtrl.push(StaffLevelPage);
  }
}
