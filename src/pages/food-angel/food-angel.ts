import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TakeAttendancePage } from '../take-attendance/take-attendance';
import { MembershipManagementPage } from '../membership-management/membership-management';
import { MembershipApplyPage } from '../membership-apply/membership-apply';
import { MembershipEditPage } from '../membership-edit/membership-edit';
import { MemberListPage } from '../member-list/member-list';
import { SettlePermEventListPage } from '../settle-perm-event-list/settle-perm-event-list';
import { SettlePermEventInfoPage } from '../settle-perm-event-info/settle-perm-event-info';
import { EventCalendarPage } from '../event-calendar/event-calendar';
import { MemberEventRecordPage } from '../member-event-record/member-event-record';
import { MemberEventInfoPage } from '../member-event-info/member-event-info';
import { EvnetInfoPage } from '../evnet-info/evnet-info';
import { EventSuggestListPage } from '../event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../event-applied-list/event-applied-list';
import { SystemManagementPage } from '../system-management/system-management';
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
  selector: 'page-food-angel',
  templateUrl: 'food-angel.html'
})
export class FoodAngelPage {

  constructor(public navCtrl: NavController) {
  }
  goToTakeAttendance(params){
    if (!params) params = {};
    this.navCtrl.push(TakeAttendancePage);
  }goToMembershipManagement(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipManagementPage);
  }goToMembershipApply(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipApplyPage);
  }goToMembershipEdit(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipEditPage);
  }goToMemberList(params){
    if (!params) params = {};
    this.navCtrl.push(MemberListPage);
  }goToSettlePermEventList(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventListPage);
  }goToSettlePermEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventInfoPage);
  }goToEventCalendar(params){
    if (!params) params = {};
    this.navCtrl.push(EventCalendarPage);
  }goToMemberEventRecord(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventRecordPage);
  }goToMemberEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MemberEventInfoPage);
  }goToEvnetInfo(params){
    if (!params) params = {};
    this.navCtrl.push(EvnetInfoPage);
  }goToEventSuggestList(params){
    if (!params) params = {};
    this.navCtrl.push(EventSuggestListPage);
  }goToEventAppliedList(params){
    if (!params) params = {};
    this.navCtrl.push(EventAppliedListPage);
  }goToSystemManagement(params){
    if (!params) params = {};
    this.navCtrl.push(SystemManagementPage);
  }goToEventManagement(params){
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
