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
  constructor(private ajaxCall: AjaxCallProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.Member = this.navParams.data.params;
    this.Event = this.navParams.data.params2;
    const temp = this.Event['Repeat_Week'].split(",");
    this.ajaxCall.getEvents_Call("","Load_Event_Preference",this.Member,this.Event).then(result=>{

    });
    for (var i = 0; i < temp.length; i++) {
      var Words = "";
      var day: any;
      var is = false;
      var check = true;
      switch (temp[i]) {
        case "Mon":
          Words = "星期一";

          break;
        case "Tue":
          Words = "星期二";

          break;
        case "Wed":
          Words = "星期三";

          break;
        case "Thu":
          Words = "星期四";

          break;
        case "Fri":
          Words = "星期五";

          break;
        case "Sat":
          Words = "星期六";

          break;
        case "Sun":
          Words = "星期日";

          break;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPreferencePage');
  }

}
