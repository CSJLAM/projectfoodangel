import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import { MemberPreferencePage } from '../member-preference/member-preference';
@Component({
  selector: 'page-settle-perm-event-info',
  templateUrl: 'settle-perm-event-info.html'
})
export class SettlePermEventInfoPage {
  Member:any;
  Event:any;
  Week:any=[];
  Info:any;
  
  constructor(private ajaxCall: AjaxCallProvider,public navCtrl: NavController,public navParams: NavParams,) {
    this.Member= this.navParams.data.params;
    this.Event = this.navParams.data.params2;
    const temp = this.Event['Repeat_Week'].split(",");
    
    this.ajaxCall.getEvents_Call("","Load_Weekly_Perm_Setting",this.Member).then(result=>{
      this.Info=result;
      console.log(result);
      for(var i = 0; i<temp.length ; i++){
        var Words="";
        var day:any;
        var is=false;
        var check=true;
        switch(temp[i]){
          case "Mon":
          Words ="星期一";
          day=this.getMonday(new Date());
          break;
          case "Tue":
          Words ="星期二";
          day=this.getTuesday(new Date());
          break;
          case "Wed":
          Words ="星期三";
          day=this.getWednesday(new Date());
          break;
          case "Thu":
          Words ="星期四";
          day=this.getThursday(new Date());
          break;
          case "Fri":
          Words ="星期五";
          day=this.getFriday(new Date());
          break;
          case "Sat":
          Words ="星期六";
          day=this.getSaturday(new Date());
          break;
          case "Sun":
          Words ="星期日";
          day=this.getSunday(new Date());
          break;
        }
        
        for(var a=0;a<Object.keys(result).length;a++){
          console.log(day==result[a].Attend_Date);
        if(day==result[a].Attend_Date && result[a].Status=="Leave"){
          is=true;
          check=false;
          break;
        }else if(day==result[a].Attend_Date && result[a].Status=="Unchecked"){
          is=true;
          //check=true;
          break;
        }  
        }
        this.Week.push({"Week":temp[i],"Words":Words,"Day":day,"Checked":check,"GetData":is});
      }
      console.log(this.Week);
    });
    
   
  }
  Submit(){
    this.ajaxCall.setEvents_Call("","Set_Perm_leave",this.Week,this.Member,this.Event).then(result=>{
      if(result){
        this.navCtrl.pop();
      }
    });
  }
  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }
  getTuesday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -5:2); // adjust when day is sunday
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }
  getWednesday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -4:3); // adjust when day is sunday
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }
  getThursday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -3:4); // adjust when day is sunday
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }
  getFriday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -2:5); // adjust when day is sunday
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }
  getSaturday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -1:6); // adjust when day is sunday
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }
  getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -0:7); // adjust when day is sunday
    return new Date(d.setDate(diff+7)).toJSON().substring(0,10);
  }

  gotopreference(params,params2){
    
    this.navCtrl.push(MemberPreferencePage,{params,params2});
  }
}
