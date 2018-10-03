import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffListPage } from '../staff-list/staff-list';


@Component({
  selector: 'page-staff-info',
  templateUrl: 'staff-info.html'
})
export class StaffInfoPage {

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
