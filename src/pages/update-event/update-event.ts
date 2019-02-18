import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,  } from 'ionic-angular';
import { AjaxCallProvider } from '../../providers/ajax-call/ajax-call';
import {ControllerProvider} from '../../providers/controller/controller';
@Component({
  selector: 'page-update-event',
  templateUrl: 'update-event.html'
})
export class UpdateEventPage {
  Event: any;
  Campus: any;
  Event_Cate: any;
  Change_Cate: any;
  Change_Loca: any;
  jointype: any;
  isPerm:boolean=false;
  constructor(private controller: ControllerProvider,public navCtrl: NavController, public navParams: NavParams, private ajaxCall: AjaxCallProvider,public alertCtrl: AlertController, ) {
    this.Event = this.navParams.data.params;
    console.log(this.Event);
    this.ajaxCall.getEvents_Call("", "Get_Campus").then(result => {
      this.Campus = result;
      this.Campus = this.ajaxCall.transform_to_group(this.Campus, "Location");
      console.log(this.Campus);
      this.Event["Location"] = this.Campus[0].list[0].Location;
      this.SetCamp(0);
    });
    this.ajaxCall.getEvents_Call("", "Get_Event_Cate").then(result => {
      this.Event_Cate = result;
      this.Event_Cate = this.ajaxCall.transform_to_group(this.Event_Cate, "Cate_Name");
      console.log(this.Event_Cate);
      //this.SetCate(this.Event.Event_Cate);
      this.ajaxCall.getEvents_Call("", "Get_Event_For", this.Event.Event_Type).then(result2 => {
        this.jointype = result2;
       // console.log("---------" + this.Event.Event_Type);
        //console.log("//////////"+this.jointype);
        this.SetCate(this.jointype);
      });
    });
  }
  SetCamp(id) {
    this.Change_Loca=this.Campus[id].list; //wrong method before add one more member.
  }
  SetCate(Cate) {
    this.Change_Cate=this.Event_Cate[Cate-1].list; //wrong method before add one more member.
  }
  Check_Perm(){
    if(this.Event['Event_Type'].Type=="1"){
      this.isPerm=true;
      this.Event['Start_Date']=null;
      this.Event['End_Date']=null;
      console.log(this.isPerm);
    }else{
      this.isPerm=false;
      console.log(this.isPerm);
    }
    //console.log(this.Event['Event_Type']+"<"+this.isPerm);
  }
  SaveEvent(){
    
    // let obj = { 'ID':this.Event['ID'],'Event_Connect':this.Event['Event_Connect'],'Event_Name':this.Event['Event_Name'],'Event_Location':this.Event['Event_Location'],'Event_Info':this.Event['Event_Info'],'Event_Limit':this.Event['Event_Limit'],'Event_Cate':this.Event['Event_Cate'],'Event_Type':this.Event['Event_Type'].ID,'Start_Date':this.Event['Start_Date'],'End_Date':this.Event['End_Date'],'Start_Time':this.Event['Start_Time'],'End_Time':this.Event['End_Time'],'Repeat_Week':(typeof this.Event['Repeat_Week'] === "undefined" ? "" : this.Event['Repeat_Week'].toString()),'Create_By':this.Name };
    //let obj = { 'ID':this.Event['ID'],'Event_Connect':this.Event['Event_Connect'],'Event_Name':this.Event['Event_Name'],'Event_Location':this.Event['Event_Location'],'Event_Info':this.Event['Event_Info'],'Event_Limit':this.Event['Event_Limit'],'Event_Cate':this.Event['Event_Type'].Type,'Event_Type':this.Event['Event_Type'].ID,'Start_Date':this.Event['Start_Date'],'End_Date':this.Event['End_Date'],'Start_Time':this.Event['Start_Time'],'End_Time':this.Event['End_Time'],'Repeat_Week':(typeof this.Event['Repeat_Week'] === "undefined" ? "" : this.Event['Repeat_Week'].toString()),'Create_By':this.Name };
    //console.log(obj);
    this.controller.showLoading();
    this.ajaxCall.AddEvents_Call("Update_Event",this.Event).then(available => {
      this.controller.hideLoading();
      if(available){
        this.navCtrl.pop();
       }
    });
  }
  DeleteEvent(){
    let prompt = this.alertCtrl.create({
      title: '完結這活動?',
      //  message: "Do you want to make this post?",

      buttons: [
        {
          text: '取消',
          handler: data => {
            //this.log('Cancel clicked');
          }
        },
        {
          text: '確認',
          handler: data => {
            this.ajaxCall.AddEvents_Call("Delete_Event",this.Event['ID']).then(result=>{
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
