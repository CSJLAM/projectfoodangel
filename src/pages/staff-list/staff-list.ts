import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffInfoPage } from '../staff-info/staff-info';
import { StaffListPage } from '../staff-list/staff-list';

@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html'
})
export class StaffListPage {

  constructor(public navCtrl: NavController) {
  }
  goToStaffInfo(params){
    if (!params) params = {};
    this.navCtrl.push(StaffInfoPage);
  }goToStaffList(params){
    if (!params) params = {};
    this.navCtrl.push(StaffListPage);
  }
}
