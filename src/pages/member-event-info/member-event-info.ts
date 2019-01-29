import { Component } from '@angular/core';
import {  NavController ,NavParams, AlertController, } from 'ionic-angular';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call';

@Component({
  selector: 'page-member-event-info',
  templateUrl: 'member-event-info.html'
})
export class MemberEventInfoPage {
  Event:any;
  Data:any={Event_Name:""};
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,public navParams: NavParams, public alertCtrl: AlertController,) {
    this.Event = this.navParams.data.params;

  }
  ionViewDidEnter() {
    this.Event = this.navParams.data.params;
    this.ajaxCall.getEvents_Call("","Load_Event_Name",this.Event.Event_ID).then(result=>{
      console.log(result);
      this.Data=result;
    });
   }
   Confirm(){
    
            let prompt = this.alertCtrl.create({
              title: '確認到名單?',
              //  message: "Do you want to make this post?",

              buttons: [
                {
                  text: '取消',
                  handler: data => {
                    this.log('Cancel clicked');
                  }
                },
                {
                  text: '確認',
                  handler: data => {
                    this.ajaxCall.AddEvents_Call("Waiting_to_confirm",this.Event.ID).then(result=>{
                      this.navCtrl.pop();
                    });
                  }
                }
              ]
            });
            prompt.present();
           
   
   }
   Cancel(){
    let prompt = this.alertCtrl.create({
      title: '取消報名?',
      //  message: "Do you want to make this post?",

      buttons: [
        {
          text: '取消',
          handler: data => {
            this.log('Cancel clicked');
          }
        },
        {
          text: '確認',
          handler: data => {
            if(this.Event.Status==0){
            this.ajaxCall.AddEvents_Call("confirm_to_suggeestion",this.Event.ID).then(result=>{
              this.navCtrl.pop();
            });
          }else{
            this.ajaxCall.AddEvents_Call("waiting_to_delete",this.Event.ID).then(result=>{
              this.navCtrl.pop();
            });
          }
          }
        }
      ]
    });
    prompt.present();
   
   }
   log(data){
     console.log(data);
   }
}
