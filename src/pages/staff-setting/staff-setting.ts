import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffListPage } from '../staff-list/staff-list';
import { StaffInfoPage } from '../staff-info/staff-info';
import { StaffLevelListPage } from '../staff-level-list/staff-level-list';
import { StaffLevelPage } from '../staff-level/staff-level';

@Component({
  selector: 'page-staff-setting',
  templateUrl: 'staff-setting.html'
})
export class StaffSettingPage {

  constructor(public navCtrl: NavController) {
  }
  goToStaffList(params){
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
