//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController  } from 'ionic-angular';
/*
  Generated class for the ControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControllerProvider {
  loader : any;
  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    //console.log('Hello ControllerProvider Provider');
  }
  showLoading() : void {
    
    this.loader = this.loadingCtrl.create({
        content: 'Please Wait...'
    });
    this.loader.present();

}

hideLoading() : void {
  if(this.loader){
    this.loader.dismiss();
    this.loader = null;
}
}

showToast(msg : string) : void {
  let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
  toast.present();
}

showAlert(msg: string) : void {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: msg,
    buttons: ['OK']
  });
  alert.present();
}

showConfirm(msg: string, title: string) : boolean {
  const confirm = this.alertCtrl.create({
    title: title,
    message: msg,
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          confirm.dismiss();
          console.log('Disagree clicked');
          return false;
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          return true;
        }
      }
    ]
  });
  confirm.present();
  return false;
}
}
