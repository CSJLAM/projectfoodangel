import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PermissionSettingPage } from '../permission-setting/permission-setting';

/**
 * Generated class for the PermissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permission',
  templateUrl: 'permission.html',
})
export class PermissionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionPage');
  }
  GoToPermission_Setting(Setting_Name,ChiName){
    this.navCtrl.push(PermissionSettingPage,{Setting_Name,ChiName});
  }

}
