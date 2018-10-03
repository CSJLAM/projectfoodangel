import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffLevelPage } from '../staff-level/staff-level';
import { StaffListPage } from '../staff-list/staff-list';
import { StaffInfoPage } from '../staff-info/staff-info';

@Component({
  selector: 'page-staff-level-list',
  templateUrl: 'staff-level-list.html'
})
export class StaffLevelListPage {

  constructor(public navCtrl: NavController) {
  }
  goToStaffLevel(params){
    if (!params) params = {};
    this.navCtrl.push(StaffLevelPage);
  }goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  }goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  }
}
