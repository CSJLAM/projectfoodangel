import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateEventPage } from '../update-event/update-event';
import { Storage } from '@ionic/storage';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'
import{ControllerProvider } from '../../providers/controller/controller'

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
  event_list ="Perm";
  Perm_List:any;
  Single_List:any;
  Outdate_List:any;
  constructor(private ajaxCall: AjaxCallProvider, private storage: Storage,public navCtrl: NavController,
    public Controller: ControllerProvider) {
  }
  ionViewDidEnter() {
    
    this.Controller.showLoading();
    setTimeout(() => {
      this.Controller.hideLoading();
     // this.Controller.showToast("Network error");
    }, 5000);
    this.Perm_List=[];
    this.Single_List=[];
    this.Outdate_List=[];
    this.ajaxCall.getEvents_Call("","Load_All_Perm_Event").then( eventlist =>{
      this.Perm_List=eventlist;
    });
    this.ajaxCall.getEvents_Call("","Load_All_Single_Event").then(eventlist =>{
      this.Single_List=eventlist;
      this.Single_List=this.ajaxCall.transform_to_group(this.Single_List,"Start_Date");
      console.log(this.Single_List);
    });
    this.ajaxCall.getEvents_Call("","Load_All_Outdated_Event").then(eventlist =>{
      this.Controller.hideLoading();
      this.Outdate_List=eventlist;
      this.Outdate_List=this.ajaxCall.transform_to_group(this.Outdate_List,"Start_Date").reverse();
    });
  }
  goToUpdateEvent(params){
    
    this.navCtrl.push(UpdateEventPage,{params});
  }
}
