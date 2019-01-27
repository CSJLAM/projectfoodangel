import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FoodAngelPage } from '../pages/food-angel/food-angel';
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
import { MemberInfoPage } from '../pages/member-info/member-info';
import { EventInfoPage } from '../pages/event-info/event-info';
import { EventSuggestListPage } from '../pages/event-suggest-list/event-suggest-list';
import { EventAppliedListPage } from '../pages/event-applied-list/event-applied-list';
import { SystemManagementPage } from '../pages/system-management/system-management';
import { EventManagementPage } from '../pages/event-management/event-management';
import { NewEventPage } from '../pages/new-event/new-event';
import { UpdateEventPage } from '../pages/update-event/update-event';
import { EventListPage } from '../pages/event-list/event-list';
import { EventCategroryListPage } from '../pages/event-categrory-list/event-categrory-list';
import { EventCategorySettingPage } from '../pages/event-category-setting/event-category-setting';
import { ShowAttendPage } from '../pages/show-attend/show-attend';
import { StaffSettingPage } from '../pages/staff-setting/staff-setting';
import { StaffListPage } from '../pages/staff-list/staff-list';
import { StaffLevelListPage } from '../pages/staff-level-list/staff-level-list';
import { StaffInfoPage } from '../pages/staff-info/staff-info';
import { StaffLevelPage } from '../pages/staff-level/staff-level';
import { CampusListPage } from '../pages/campus-list/campus-list';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NFC } from '@ionic-native/nfc';
import { IonicStorageModule } from '@ionic/storage';
import { AjaxCallProvider } from '../providers/ajax-call/ajax-call';
import { ControllerProvider } from '../providers/controller/controller';

@NgModule({
  declarations: [
    MyApp,
    FoodAngelPage,
    TakeAttendancePage,
    MembershipManagementPage,
    MembershipApplyPage,
    MembershipEditPage,
    MemberListPage,
    SettlePermEventListPage,
    SettlePermEventInfoPage,
    EventCalendarPage,
    MemberEventRecordPage,
    MemberEventInfoPage,
    MemberInfoPage,
    EventInfoPage,
    EventSuggestListPage,
    EventAppliedListPage,
    SystemManagementPage,
    EventManagementPage,
    NewEventPage,
    UpdateEventPage,
    EventListPage,
    EventCategroryListPage,
    EventCategorySettingPage,
    ShowAttendPage,
    StaffSettingPage,
    StaffListPage,
    StaffLevelListPage,
    StaffInfoPage,
    StaffLevelPage,
    CampusListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FoodAngelPage,
    TakeAttendancePage,
    MembershipManagementPage,
    MembershipApplyPage,
    MembershipEditPage,
    MemberListPage,
    SettlePermEventListPage,
    SettlePermEventInfoPage,
    EventCalendarPage,
    MemberEventRecordPage,
    MemberEventInfoPage,
    MemberInfoPage,
    EventInfoPage,
    EventSuggestListPage,
    EventAppliedListPage,
    SystemManagementPage,
    EventManagementPage,
    NewEventPage,
    UpdateEventPage,
    EventListPage,
    EventCategroryListPage,
    EventCategorySettingPage,
    ShowAttendPage,
    StaffSettingPage,
    StaffListPage,
    StaffLevelListPage,
    StaffInfoPage,
    StaffLevelPage,
    CampusListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NFC,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AjaxCallProvider,
    ControllerProvider
  ]
})
export class AppModule {}