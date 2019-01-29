import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call';
@Component({
  selector: 'page-event-suggest-list',
  templateUrl: 'event-suggest-list.html'
})
export class EventSuggestListPage {
  Event:any;
  List:any;
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,public navParams: NavParams,) {
    this.Event = this.navParams.data.params;
  }

  ionViewDidEnter() {
    
    this.ajaxCall.getEvents_Call("","Get_Suggestion",this.Event.Event_Connect).then(result=>{
      console.log(result);
      this.List=result;
    });
    
   }

   submit(){
     console.log("SUBMITed");
     this.ajaxCall.AddEvents_Call("suggestion_to_confirm",this.List).then(result=>{
      this.navCtrl.pop();
     });
   }
   
}
