import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import {ControllerProvider} from '../../providers/controller/controller';
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
  S_member:boolean =true;
  S_members:boolean=false;
  member: any;
  members: any;
  event:any;
  auto:boolean=false;
  constructor(private controller:ControllerProvider ,private ajaxCall: AjaxCallProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.member="";
    this.members="";
    this.member = this.navParams.data.params;
   this.members = this.navParams.data.params2;
   if(this.members.length>1){
     this.S_member=false;
     this.S_members=true;
   }
    this.event = this.navParams.data.id;
    this.auto = this.navParams.data.auto;
    if(this.auto==true){
      this.attend();
    }
    console.log(this.member.Chinese_Name);
    console.log(this.event);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowAttendPage');
    
  }
  attend(){
    this.ajaxCall.setEvents_Call("","MarkAttend",this.member.Member_ID,this.event).then(result=>{
      if(result==true){
        this.controller.showToast("成功出席");
        this.navCtrl.pop();
      }else{
        this.controller.showToast("你以有出席記錄! ");
        this.navCtrl.pop();
        alert("你以有出席記錄! ");
      }
    });
  }
  attends(){
    this.ajaxCall.setEvents_Call("","MarkAttends",this.members,this.event).then(result=>{
      if(result==true){
        this.controller.showToast("成功出席");
        this.navCtrl.pop();
      }else{
        this.controller.showToast("你以有出席記錄! ");
        this.navCtrl.pop();
        alert("你以有出席記錄! ");
      }
    });
  }
}
