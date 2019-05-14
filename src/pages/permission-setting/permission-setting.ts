import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import { ControllerProvider } from '../../providers/controller/controller';

/**
 * Generated class for the PermissionSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permission-setting',
  templateUrl: 'permission-setting.html',
})
export class PermissionSettingPage {
  Setting_Name: any;
  ChiName: any;
  List_of_user: any;
  List_of_un_Dept: any;
  List_of_un_user: any;
  constructor(private ajaxCall: AjaxCallProvider, public alertCtrl: AlertController, public Controller: ControllerProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.Setting_Name = this.navParams.data.Setting_Name;
    this.ChiName = this.navParams.data.ChiName;
    this.RefreshList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionSettingPage');
  }
  RefreshList() {

    this.ajaxCall.getEvents_Call("", "Load_Permission_Cate", this.Setting_Name).then(result => {
      console.log(result);
      this.List_of_user = result;
    });
    this.ajaxCall.getEvents_Call("", "Load_Permission_UN_dept", this.Setting_Name).then(result => {
      console.log(result);
      this.List_of_un_Dept = result;
    });
    this.ajaxCall.getEvents_Call("", "Load_Permission_UN_user", this.Setting_Name).then(result => {
      console.log(result);
      this.List_of_un_user = result;
    });
  }
  delete(cate) {
    let msg = "你要刪除" + cate.Name + "的權限嗎";
    let title = "刪除使用者權限"
    const confirm = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
            confirm.dismiss();
            console.log('Disagree clicked');
            
          }
        },
        {
          text: '確定',
          handler: () => {
            console.log('Agree clicked');
            this.ajaxCall.setEvents_Call("", "Permission_Delete", cate.Page, cate.Dept).then(result1 => {
              if (result1) {
                this.RefreshList();
              }
            });
          }
        }
      ]
    });
    confirm.present();
    // this.Controller.showConfirm_Call("你要刪除" + cate.Name + "的權限嗎", "刪除使用者權限").then(result => {
    //   if (result) {
    //     this.ajaxCall.setEvents_Call("", "Permission_Delete", cate.Page, cate.Dept).then(result1 => {
    //       if (result1) {
    //         this.RefreshList();
    //       }
    //     });
    //   }
    // });

  }
  Add(cate) {

    let msg = "你要增加" + cate.Name + "的權限嗎";
    let title = "增加使用者權限"
    const confirm = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
            //confirm.dismiss();
            console.log('Disagree clicked');
            
          }
        },
        {
          text: '確定',
          handler: () => {
            console.log('Agree clicked');
            this.ajaxCall.setEvents_Call("", "Permission_Add", cate.Page, cate.Dept).then(result1 => {
              if (result1) {
                this.RefreshList();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
