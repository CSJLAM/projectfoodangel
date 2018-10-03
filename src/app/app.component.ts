import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TakeAttendancePage } from '../pages/take-attendance/take-attendance';
import { MembershipManagementPage } from '../pages/membership-management/membership-management';
import { MembershipApplyPage } from '../pages/membership-apply/membership-apply';
import { MembershipEditPage } from '../pages/membership-edit/membership-edit';
import { MemberListPage } from '../pages/member-list/member-list';
import { SettlePermEventListPage } from '../pages/settle-perm-event-list/settle-perm-event-list';
import { SettlePermEventInfoPage } from '../pages/settle-perm-event-info/settle-perm-event-info';
import { EventCalendarPage } from '../pages/event-calendar/event-calendar';
import { MemberEventRecordPage } from '../pages/member-event-record/member-event-record';
import { MemberEventInfoPage } from '../pages/member-event-info/member-event-info';
import { EvnetInfoPage } from '../pages/evnet-info/evnet-info';
import { EventSuggestListPage } from '../pages/event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../pages/event-applied-list/event-applied-list';
import { SystemManagementPage } from '../pages/system-management/system-management';
import { EventManagementPage } from '../pages/event-management/event-management';
import { NewEventPage } from '../pages/new-event/new-event';
import { UpdateEventPage } from '../pages/update-event/update-event';
import { EventCategroryListPage } from '../pages/event-categrory-list/event-categrory-list';
import { EventCategorySettingPage } from '../pages/event-category-setting/event-category-setting';
import { StaffSettingPage } from '../pages/staff-setting/staff-setting';
import { StaffListPage } from '../pages/staff-list/staff-list';
import { StaffInfoPage } from '../pages/staff-info/staff-info';
import { StaffLevelListPage } from '../pages/staff-level-list/staff-level-list';
import { StaffLevelPage } from '../pages/staff-level/staff-level';


import { FoodAngelPage } from '../pages/food-angel/food-angel';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = FoodAngelPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToFoodAngel(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FoodAngelPage);
  }goToTakeAttendance(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TakeAttendancePage);
  }goToMembershipManagement(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MembershipManagementPage);
  }goToMembershipApply(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MembershipApplyPage);
  }goToMembershipEdit(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MembershipEditPage);
  }goToMemberList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MemberListPage);
  }goToSettlePermEventList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettlePermEventListPage);
  }goToSettlePermEventInfo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettlePermEventInfoPage);
  }goToEventCalendar(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EventCalendarPage);
  }goToMemberEventRecord(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MemberEventRecordPage);
  }goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MemberEventInfoPage);
  }goToEvnetInfo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EvnetInfoPage);
  }goToEventSuggestList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EventSuggestListPage);
  }goToEventAppliedList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EventAppliedListPage);
  }goToSystemManagement(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SystemManagementPage);
  }goToEventManagement(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EventManagementPage);
  }goToNewEvent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(NewEventPage);
  }goToUpdateEvent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(UpdateEventPage);
  }goToEventCategroryList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EventCategroryListPage);
  }goToEventCategorySetting(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EventCategorySettingPage);
  }goToStaffSetting(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StaffSettingPage);
  }goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StaffListPage);
  }goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StaffInfoPage);
  }goToStaffLevelList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StaffLevelListPage);
  }goToStaffLevel(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StaffLevelPage);
  }
}
