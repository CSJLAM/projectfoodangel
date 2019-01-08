import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call'
/**
 * Generated class for the ShowAttendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-attend',
  templateUrl: 'show-attend.html',
})
export class ShowAttendPage {
  member: any;
  event:any;
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.member = this.navParams.data.params;
    this.event = this.navParams.data.id;
    console.log(this.member.Chinese_Name);
    console.log(this.event);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowAttendPage');
  }
  attend(){
    this.ajaxCall.setEvents_Call("","MarkAttend",this.member.Member_ID,this.event).then(result=>{
      if(result==true){
        this.navCtrl.pop();
      }
    });
  }
}
