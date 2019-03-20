import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call';

/**
 * Generated class for the EventMultiApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-multi-apply',
  templateUrl: 'event-multi-apply.html',
})
export class EventMultiApplyPage {
  members:any;
  event:any;
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController, public navParams: NavParams) {
   this.members = this.navParams.data.params;
   this.event = this.navParams.data.params2;
   for(var temp=0; temp<this.members.length; temp++){
     this.members[temp].Checked=true;
   }
  // alert(this.members);
   //alert(this.event);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMultiApplyPage');
  }
  Submit(){
    this.ajaxCall.AddEvents_Call("Apply_Events",this.event,this.members).then(result=>{
      this.navCtrl.pop();
     });
  }

}
