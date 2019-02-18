import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';

@Component({
  selector: 'page-settle-perm-event-info',
  templateUrl: 'settle-perm-event-info.html'
})
export class SettlePermEventInfoPage {
  Member:any;
  Event:any;
  Week:any=[];
  constructor(public navCtrl: NavController,public navParams: NavParams,) {
    this.Member= this.navParams.data.params;
    this.Event = this.navParams.data.params2;
    const temp = this.Event['Repeat_Week'].split(",");
    
    
    for(var i = 0; i<temp.length ; i++){
      this.Week.push({"Week":temp[0],"Checked":false});
    }
    console.log(this.Week);
  }
  
}
