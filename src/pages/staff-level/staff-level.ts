import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffListPage } from '../staff-list/staff-list';
import { StaffInfoPage } from '../staff-info/staff-info';

@Component({
  selector: 'page-staff-level',
  templateUrl: 'staff-level.html'
})
export class StaffLevelPage {

  constructor(public navCtrl: NavController) {
  }
  goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  }goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  }
}
