import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MembershipApplyPage } from '../membership-apply/membership-apply';
import { MembershipEditPage } from '../membership-edit/membership-edit';
import { MemberListPage } from '../member-list/member-list';
import { SettlePermEventListPage } from '../settle-perm-event-list/settle-perm-event-list';
import { SettlePermEventInfoPage } from '../settle-perm-event-info/settle-perm-event-info';
import { Storage } from '@ionic/storage';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';

@Component({
  selector: 'page-membership-management',
  templateUrl: 'membership-management.html'
})
export class MembershipManagementPage {
//permission
Permission_List:any;
NewAndEditMember=false;
public Staff_Hash: string = null;
  public Staff_Dept: string = null;
  constructor(private ajaxCall:AjaxCallProvider,private storage:Storage,public navCtrl: NavController) {
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
  goToMembershipApply(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipApplyPage);
  }goToMembershipEdit(params){
    if (!params) params = {};
    this.navCtrl.push(MembershipEditPage);
  }goToMemberList(params){
    if (!params) params = {};
    this.navCtrl.push(MemberListPage);
  }goToSettlePermEventList(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventListPage);
  }goToSettlePermEventInfo(params){
    if (!params) params = {};
    this.navCtrl.push(SettlePermEventInfoPage);
  }
}
