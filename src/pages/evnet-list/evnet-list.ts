import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateEventPage } from '../update-event/update-event';
import { Storage } from '@ionic/storage';
import {AjaxCallProvider} from '../../providers/ajax-call/ajax-call'

@Component({
  selector: 'page-evnet-list',
  templateUrl: 'evnet-list.html'
})
export class EvnetListPage {
  event_list ="Perm";
  Perm_List:any;
  Single_List:any;
  Outdate_List:any;
  constructor(private ajaxCall: AjaxCallProvider, private storage: Storage,public navCtrl: NavController) {
  }
  ionViewDidEnter() {
    this.Perm_List=[];
    this.Single_List=[];
    this.Outdate_List=[];
    this.ajaxCall.getEvents_Call("","Load_All_Perm_Event").then( eventlist =>{
      this.Perm_List=eventlist;
    });
    this.ajaxCall.getEvents_Call("","Load_All_Single_Event").then(eventlist =>{
      this.Single_List=eventlist;
      this.Single_List=this.ajaxCall.transform_to_group(this.Single_List,"Start_Date");
    });
    this.ajaxCall.getEvents_Call("","Load_All_Outdated_Event").then(eventlist =>{
      this.Outdate_List=eventlist;
      this.Outdate_List=this.ajaxCall.transform_to_group(this.Outdate_List,"Start_Date").reverse();
    });
  }
  goToUpdateEvent(params){
    if (!params) params = {};
    this.navCtrl.push(UpdateEventPage);
  }
}
