import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';

/**
 * Generated class for the MemberPreferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-preference',
  templateUrl: 'member-preference.html',
})
export class MemberPreferencePage {
  Member: any;
  Event: any;
  Week:any=[];
  Info:any;

  constructor(private ajaxCall: AjaxCallProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.Member = this.navParams.data.params;
    this.Event = this.navParams.data.params2;
    const temp = this.Event['Repeat_Week'].split(",");

    this.ajaxCall.getEvents_Call("","Load_Event_Preference",this.Member,this.Event).then(result=>{
      this.Info=result;
      console.log(result);
      const leave = result[0].Week.split(",");
      for(var i = 0; i<temp.length ; i++){
        var Words="";
        var day:any;
        var is=false;
        var check=false;
        switch(temp[i]){
          case "Mon":
          Words ="星期一";
          //day=this.getMonday(new Date());
          break;
          case "Tue":
          Words ="星期二";
          //day=this.getTuesday(new Date());
          break;
          case "Wed":
          Words ="星期三";
          //day=this.getWednesday(new Date());
          break;
          case "Thu":
          Words ="星期四";
          //day=this.getThursday(new Date());
          break;
          case "Fri":
          Words ="星期五";
          //day=this.getFriday(new Date());
          break;
          case "Sat":
          Words ="星期六";
          //day=this.getSaturday(new Date());
          break;
          case "Sun":
          Words ="星期日";
          //day=this.getSunday(new Date());
          break;
        }
        for(var a = 0; a<leave.length;a++){
          if(temp[i]==leave[a]){
            check=true;
          }
        }
        console.log(leave);
        

        // for(var a=0;a<Object.keys(result).length;a++){
        //   console.log(day==result[a].Attend_Date);
        // if(day==result[a].Attend_Date && result[a].Status=="Leave"){
        //   is=true;
        //   check=false;
        //   break;
        // }else if(day==result[a].Attend_Date && result[a].Status=="Unchecked"){
        //   is=true;
        //   //check=true;
        //   break;
        // }  
        // }
        this.Week.push({"Week":temp[i],"Words":Words,"Checked":check});
      }
      console.log(this.Week);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPreferencePage');
  }

}
