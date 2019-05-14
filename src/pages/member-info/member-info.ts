import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import { MembershipEditPage } from '../membership-edit/membership-edit';
import { SettlePermEventListPage } from '../settle-perm-event-list/settle-perm-event-list';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html'
})
export class MemberInfoPage {
  //permission
  Permission_List: any;
  NewAndEditMember = false;
  public Staff_Hash: string = null;
  public Staff_Dept: string = null;
  //
  Member: any;
  Applyed_List: any;
  Pass_List: any;
  constructor(private storage:Storage,private ajaxCall: AjaxCallProvider, public navCtrl: NavController, public navParams: NavParams, ) {
    this.Member = this.navParams.data.params;
    this.storage.get('Staff_Hash').then((val) => {
      if (val != null) {
        this.Staff_Hash=val;
      }
      this.storage.get('Staff_Dept').then((val) => {
        if(val!=null){
          this.Staff_Dept=val;
        }
        this.Check_Permission();
      });
    });

  }
  Check_Permission(){
    this.ajaxCall.getEvents_Call("","Check_Permission",this.Staff_Dept,this.Staff_Hash).then(result =>{
      this.Permission_List=result;
      var NewAndEditMember= this.Permission_List.findIndex(work => work.Page === "NewAndEditMember");
      if(NewAndEditMember!=-1){
        this.NewAndEditMember=true;
       }
        console.log("~"+NewAndEditMember);
      
       
    });
  }
  ionViewDidEnter() {

    this.ajaxCall.Member_function_Call("List_Applyed_Event", this.Member.Member_ID).then(result => {
      this.Applyed_List = result;
      this.ajaxCall.Member_function_Call("List_Pass_Event", this.Member.Member_ID).then(result => {
        this.Pass_List = result;
      });
    });

  }
  goToMemberInfo(params) {
    this.navCtrl.push(MembershipEditPage, { params });
  }
  goToSettle(params) {
    //console.log(params);
    this.navCtrl.push(SettlePermEventListPage, { params });
  }


}
