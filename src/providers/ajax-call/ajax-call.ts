//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import{ControllerProvider } from '../controller/controller';



/*
  Generated class for the AjaxCallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  101.78.175.101:8580
  and Angular DI.
*/
@Injectable()
export class AjaxCallProvider {
  returnInfo: any;
  link: string = "http://101.78.175.101:8580/foodangel/";
  constructor(
    //public Controller: ControllerProvider
  ) {
    console.log('Hello AjaxCallProvider Provider');
  }
  Deptlisting(type, info, info2, info3, fn) {
    switch (type) {
      case "Show_Dept":
        this.returnInfo = [];
        break;
      case "Add_Dept":
      case "Edit_Dept":
      case "Delete_Dept":
      case "Add_Staff":
      case "Edit_Staff":
        this.returnInfo = false;
        break;
      case "Load_Staff_Info":
        this.returnInfo = [];
        break;
    }
    var xmlhttp = new XMLHttpRequest();
    var url = this.link + "checkUser.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj['result']) {
          console.info(obj.info);
          switch (type) {
            case "Show_Dept":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "ID": result.ID, "Dept_Name": result.Dept_Name, "Dept_Hash": result.Dept_Hash });
              }
              break;

            case "Add_Dept":
            case "Edit_Dept":
            case "Delete_Dept":
            case "Add_Staff":
            case "Edit_Staff":
              this.returnInfo = true;
              break;
            case "Load_Staff_Info":
              this.returnInfo.push({ 'ID': obj.info.ID, 'Staff_ID': obj.info.Staff_ID, 'Staff_Hash': obj.info.Staff_Hash, 'Username': obj.info.Username, 'Name': obj.info.Name, 'Password': "", 'Password2': "", 'Staff_Dept': obj.info.Staff_Dept, 'Staff_Join': obj.info.Staff_Join, 'Staff_End': obj.info.Staff_End, 'Create_By': "" });
              break;

            default:
              break;
          }
          // console.log("return info");
          // console.log(this.returnInfo);
          // console.log("return info");
          fn(this.returnInfo);
        }
        else {
          alert("Some ERROR");
          this.returnInfo = "SOMEERROR";
        }
      }
    }

    var obj = { "Function": type, "info": info, "info2": info2, "info3": info3, "Passcode": "CheckME" };
    this.log(obj);
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
    console.log("jsonDoc=" + JSON.stringify(obj));

  }
  Deptlisting_Call(type, info, info2, info3) {
    return new Promise(resolve => {
      this.Deptlisting(type, info, info2, info3, resolve);
    });
  }
  getEvents(location, type, info, info2, fn) {
    //  this.Controller.showLoading();
    var xmlhttp = new XMLHttpRequest();
    var url = this.link + "Ajax_GetInfo.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //    this.Controller.hideLoading();
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.result == true) {

          console.info(obj.info);

          this.returnInfo = [];
          switch (type) {
            case "VER":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                fn(result.ver);
              }
              break;
           
            case "HomePerm":
            case "Home_Today":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];

                this.returnInfo.push({ "ID": result.ID, "Event_Name": result.Event_Name, "Room": result.Room });
              }
              break;
            case "Load_Event_Attend":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.log(Your);
                //this.log('++');
                if (result.Attend == "Checked") {
                  this.returnInfo.push({ "Checked": true, "Attend": result.Attend, "Event_ID": result.Event_ID, "Chinese_Name": result.Chinese_Name, "Octopus": result.Octopus, "Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F, "Fam_Chinese_Name": result.Fam_Chinese_Name });
                } else {
                  this.returnInfo.push({ "Checked": false, "Attend": result.Attend, "Event_ID": result.Event_ID, "Chinese_Name": result.Chinese_Name, "Octopus": result.Octopus, "Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F, "Fam_Chinese_Name": result.Fam_Chinese_Name });
                }
              }
              break;
            case "Load_All_Perm_Event":
            case "Load_All_Single_Event":
            case "Load_All_Outdated_Event":
              var Edata: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.log(Your);
                //this.log('++');
                //this.returnInfo.push({ "ID": result.ID, "Event_Name": result.Event_Name, "Room": result.Room, "Start_Date": result.Start_Date });
                Edata.push({
                  "Create_By": result.Create_By, "Create_Date": result.Create_Date, "Deleted": result.Deleted, "End_Date": result.End_Date,
                  "End_Time": result.End_Time, "Event_Cate": result.Event_Cate, "Event_Connect": result.Event_Connect, "Event_Info": result.Event_Info,
                  "Event_Limit": result.Event_Limit, "Event_Location": result.Event_Location, "Event_Name": result.Event_Name, "Event_Type": result.Event_Type,
                  "ID": result.ID, "Repeat_Week": result.Repeat_Week, "Room": result.Room, "Start_Date": result.Start_Date, "Start_Time": result.Start_Time
                });
              }
              fn(Edata);
              break;
            case "Load_Weekly_Perm_Setting":
              var Load_Weekly_Perm_Setting: any = [];
              if (obj.info != undefined) {
                for (var i = 0; i < obj.info.length; i++) {
                  var result = obj.info[i];
                  //this.returnInfo.push({ "ID": result.ID, "Room": result.Room, "Campus_ID": result.Campus_ID, "Location": result.Location });
                  Load_Weekly_Perm_Setting.push({ "Attend_Date": result.Attend_Date, "Event_ID": result.Event_ID, "ID": result.ID, "Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F, "Status": result.Status });

                }
              } else {
                Load_Weekly_Perm_Setting.push({ "Attend_Date": "", "Event_ID": "", "ID": "", "Member_ID": "", "Member_ID_F": "", "Status": "" });
              }
              fn(Load_Weekly_Perm_Setting);

              break;
            case "Load_Event_Preference":
              var Load_Event_Preference: any = [];
              if (obj.info != undefined) {
                for (var i = 0; i < obj.info.length; i++) {
                  var result = obj.info[i];
                  //this.returnInfo.push({ "ID": result.ID, "Room": result.Room, "Campus_ID": result.Campus_ID, "Location": result.Location });
                  Load_Event_Preference.push({ "ID": result.ID, "Event_ID": result.Event_ID, "Member_ID": result.Member_ID, "Week": result.Week, "Deleted": result.Deleted });

                }
              } else {
                Load_Event_Preference.push({ "ID": "", "Event_ID": "", "Member_ID": "", "Week": "", "Deleted": "" });
              }
              fn(Load_Event_Preference);

              break;
            case "Get_Campus":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "ID": result.ID, "Room": result.Room, "Campus_ID": result.Campus_ID, "Location": result.Location });
              }
              break;
            case "Get_Event_For":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.returnInfo.push({ "ID": result.ID, "Name": result.Name, "Type": result.Type, "Event_For": result.Event_For, "Cate_Name": result.Cate_Name });
                console.log("6666666666---" + result.Event_For);
                fn(result.Event_For);
              }
              break;
            case "Get_Event_Cate":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "ID": result.ID, "Name": result.Name, "Type": result.Type, "Event_For": result.Event_For, "Cate_Name": result.Cate_Name });
              }
              break;
            case "Get_event_info":
              let Get_event_info: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Get_event_info = { "ID": result.ID, "Event_Connect": result.Event_Connect, "Event_Location": result.Event_Location, "Event_Name": result.Event_Name, "Event_Info": result.Event_Info, "Event_Limit": result.Event_Limit, "Event_Cate": result.Event_Cate, "Event_Type": result.Event_Type, "Start_Date": result.Start_Date, "End_Date": result.End_Date, "Start_Time": result.Start_Time, "End_Time": result.End_Time, "Repeat_Week": result.Repeat_Week, "Create_Date": result.Create_Date, "Create_By": result.Create_By, "Deleted": result.Deleted };
              }
              fn(Get_event_info);
              break;
            case "Get_Suggestion":
              let Get_Suggestion: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];

                Get_Suggestion.push({ "ID": result.ID, "Event_ID": result.Event_ID, "Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F, "Create_Date": result.Create_Date, "Create_By": result.Create_By, "Status": result.Status, "Del": result.Del, "Chinese_Name": result.Chinese_Name, "fam_member": result.fam_member, "Check": false });
              }
              fn(Get_Suggestion);
              break;
            case "Get_Confirm_List":
              let Get_Confirm_List: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];

                Get_Confirm_List.push({ "ID": result.ID, "Event_ID": result.Event_ID, "Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F, "Create_Date": result.Create_Date, "Create_By": result.Create_By, "Status": result.Status, "Del": result.Del, "Chinese_Name": result.Chinese_Name, "fam_member": result.fam_member, "Check": false });
              }
              fn(Get_Confirm_List);
              break;
            case "Get_Waiting_List":
              let Get_Waiting_List: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];

                Get_Waiting_List.push({ "ID": result.ID, "Event_ID": result.Event_ID, "Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F, "Create_Date": result.Create_Date, "Create_By": result.Create_By, "Status": result.Status, "Del": result.Del, "Chinese_Name": result.Chinese_Name, "fam_member": result.fam_member, "Check": false });
              }
              fn(Get_Waiting_List);
              break;
            case "Load_Event_Name":
              let Load_Event_Name: any;
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Load_Event_Name = { "ID": result.ID, "Event_Connect": result.Event_Connect, "Event_Location": result.Event_Location, "Event_Name": result.Event_Name, "Event_Info": result.Event_Info, "Event_Limit": result.Event_Limit, "Event_Cate": result.Event_Cate, "Event_Type": result.Event_Type, "Start_Date": result.Start_Date, "End_Date": result.End_Date, "Start_Time": result.Start_Time, "End_Time": result.End_Time, "Repeat_Week": result.Repeat_Week, "Create_Date": result.Create_Date, "Create_By": result.Create_By, "Deleted": result.Deleted };
              }
              fn(Load_Event_Name);
              break;
              case "Load_Permission_Cate":
              let Load_Permission_Cate: any =[];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Load_Permission_Cate.push({"Dept": result.Dept, "Name": result.Name, "Page": result.Page});
                
              }
              fn(Load_Permission_Cate);
              break;
              case "Load_Permission_UN_dept":
              let Load_Permission_UN_dept: any =[];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Load_Permission_UN_dept.push({"Dept": result.Dept, "Name": result.Name, "Page": result.Page});
                
              }
              fn(Load_Permission_UN_dept);
              
              break;
              case "Load_Permission_UN_user":
              let Load_Permission_UN_user: any =[];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Load_Permission_UN_user.push({"Dept": result.Dept, "Name": result.Name, "Page": result.Page});
                
              }
              fn(Load_Permission_UN_user);
              break;
              case "Check_Permission":
              let Check_Permission: any =[];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Check_Permission.push({"Dept": result.Dept, "Page": result.Page});
                
              }
              fn(Check_Permission);
              break;
            default:
              break;
          }
          fn(this.returnInfo);

        } else if (obj.errorCode != null) {

          this.log(obj.errorCode);
        }



      }
    }

    var obj = { "Passcode": "GetInfo", "Function": type, "info": info, "info2": info2 };
    this.log(this.link + "Ajax_GetInfo.php?jsonDoc=" + JSON.stringify(obj));
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  getEvents_Call(location, type, info = "", info2 = "") {
    return new Promise(resolve => {
      this.getEvents(location, type, info, info2, resolve);
    });
  }
  setEvents(location, type, info, info2, info3, fn) {

    var xmlhttp = new XMLHttpRequest();
    var url = this.link + "Ajax_GetInfo.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.result == true) {

          console.info(obj.info);

          this.returnInfo = [];
          switch (type) {

            case "MarkAttend":

              this.returnInfo = obj.info;
              break;
            case "MarkAttends":

              this.returnInfo = obj.info;
              break;
            case "Set_Perm_leave":
              fn(true);
              break;
            case "Permission_Delete":
            fn(true);
            case "Permission_Add":
            fn(true);
            break;
            default:
              break;
          }
          fn(this.returnInfo);

        } else if (obj.errorCode != null) {

          this.log(obj.errorCode);
        }



      }
    }

    var obj = { "Passcode": "SetInfo", "Function": type, "info": info, "info2": info2, "info3": info3 };
    this.log(this.link + "Ajax_GetInfo.php?jsonDoc=" + JSON.stringify(obj));
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  setEvents_Call(location, type, info = "", info2 = "", info3 = "") {
    return new Promise(resolve => {
      this.setEvents(location, type, info, info2, info3, resolve);
    });
  }
  AddEvents(type, info, info2, info3, fn) {

    var xmlhttp = new XMLHttpRequest();
    var url = this.link + "Ajax_SetInfo.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.result == true) {

          console.info(obj.info);

          this.returnInfo = [];
          switch (type) {
            case "HomePerm":
            case "Home_Today":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];

                this.returnInfo.push({ "ID": result.ID, "Event_Name": result.Event_Name, "Room": result.Room });
              }
              break;
            case "Set_Event":
            case "Update_Event":
            case "Delete_Event":
              this.returnInfo = true;
              break;
            case "Apply_Event":
            case "Apply_Events":
              this.returnInfo = true;
              break;
            case "Attened_Evnet":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "Chinese_Name": result.Chinese_Name, "Member_ID": result.Member_ID });
              }
            case "suggestion_to_confirm":
            case "Waiting_to_confirm":
            case "waiting_to_delete":
            case "confirm_to_suggeestion":
              fn(true);
              break;
            default:
              break;
          }
          fn(this.returnInfo);

        } else if (obj.errorCode != null) {

          this.log(obj.errorCode);
        }



      }
    }

    var obj = { "Passcode": "SetIt", "Function": type, "info": info, "info2": info2, "info3": info3 };
    this.log(url + "?jsonDoc=" + JSON.stringify(obj));
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  AddEvents_Call(type, info: any = "", info2: any = "", info3: any = "") {
    return new Promise(resolve => {
      this.AddEvents(type, info, info2, info3, resolve);
    });
  }

  transform_to_group(value: any, groupByKey: string) {
    const events: any[] = [];
    const groupedElements: any = {};
    //console.log("----Grouping------");
    value.forEach((obj: any) => {
      if (!(obj[groupByKey] in groupedElements)) {
        groupedElements[obj[groupByKey]] = [];
        //console.log(groupedElements);
      }
      groupedElements[obj[groupByKey]].push(obj);
      //console.log(groupedElements);
    });
    //console.log("------Firstpart------");
    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        events.push({
          key: prop,
          list: groupedElements[prop]
        });
        //console.log(events);
      }
    }
    //console.log("------End---------");
    return events;
  }
  Member_function(type, info, info2, info3, info4, fn) {
    var Passcode = "";
    switch (type) {
      case "List_Member_Type":
      case "List_Member":
      case "List_Applyed_Event":
      case "List_Pass_Event":
      case "Apply_Get_Perm_Event":
      // case "List_Member_Type_Event_Type":
      case "List_Member_Type_Perm_Event_Type":
      case "Get_Member_Family_Info_by_ID":
      case "Get_Member_Family_Info_by_Octopus":
      case "Get_Member_Urgent_Info_by_ID":
      case "Get_Member_Perm_Event":
      case "Get_Appled_Member_Perm_Event":
        Passcode = "GetMember";
        this.returnInfo = [];
        break;
      case "Get_Member_Info_by_ID":
      case "Get_Member_Info_by_Octopus":
        Passcode = "GetMember";
        this.returnInfo = "";
        break;
      case "Apply_New_Member":
      case "Update_Member":
      case "Testing":
        Passcode = "SetMember";
        this.returnInfo = "";
        break;

    }
    var xmlhttp = new XMLHttpRequest();
    var url = this.link + "Ajax_Member.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj['result']) {
          console.info(obj.info);
          switch (type) {
            case "List_Member_Type":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "ID": result.ID, "Name": result.Name });
              }
              break;
            // case "List_Member_Type_Event_Type":
            // for (var i = 0; i < obj.info.length; i++) {
            //   var result = obj.info[i];
            //   this.returnInfo.push({ "ID": result.ID, "Name": result.Name ,"Type":result.Type,"Event_For":result.Event_For});
            // }
            // break;
            case "List_Member_Type_Perm_Event_Type":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "ID": result.ID, "Name": result.Name, "Type": result.Type, "Event_For": result.Event_For });
              }
              break;
            case "List_Member":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "Member_ID": result.Member_ID, "Chinese_Name": result.Chinese_Name });
              }
              break;
            case "List_Applyed_Event":
              this.returnInfo = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "Event_ID": result.Event_ID, "Event_Name": result.Event_Name });
              }
              break;
            case "List_Pass_Event":
              this.returnInfo = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "Event_ID": result.Event_ID, "Event_Name": result.Event_Name });
              }
              break;
            case "Apply_Get_Perm_Event":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "Event_Connect": result.Event_Connect, "Event_Name": result.Event_Name, "Check": false });
              }
              break;
            case "Get_Member_Info_by_ID":
            case "Get_Member_Info_by_Octopus":
              this.returnInfo = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.returnInfo.push({ "Event_ID": result.Event_ID, "Event_Name": result.Event_Name });
                this.returnInfo = {
                  "ID": result.ID, "Member_ID": result.Member_ID, "Octopus": result.Octopus, "Member_Type": result.Member_Type, "Chinese_Name": result.Chinese_Name, "English_Name": result.English_Name, "Gender": result.Gender, "DOB": result.DOB, "HKID": result.HKID,
                  "Address": result.Address, "Marriage": result.Marriage, "Occupation": result.Occupation, "Year_In_HK": result.Year_In_HK, "Contact_1": result.Contact_1, "Contact_2": result.Contact_2, "Gov_CSSA": result.Gov_CSSA,
                  "Family_Income": result.Family_Income, "Elderly_Income": result.Elderly_Income, "Old_Age_Allowance": result.Old_Age_Allowance, "Disability_Allowance": result.Disability_Allowance, "Pension": result.Pension, "Family_Support": result.Family_Support, "E_Num_Son": result.E_Num_Son,
                  "E_Life_Tgt": result.E_Life_Tgt, "Photo_Auth": result.Photo_Auth, "Declaration_1": result.Declaration_1, "Declaration_2": result.Declaration_2, "End": result.End, "P_ID": result.P_ID, "Remark": result.Remark, "Reason": result.Reason
                };

              }
              break;
            case "Get_Fam_Info_by_Octopus":

              break;
            case "Get_Member_Family_Info_by_ID":
            case "Get_Member_Family_Info_by_Octopus":
              let INFO: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.returnInfo.push({"ID": result.ID,"Master_member": result.Master_member,"Member_SID": result.Member_SID,"Chinese_Name": result.Chinese_Name,"English_Name": result.English_Name,"Gender": result.Gender,"Relationship": result.Relationship,"Live_Together": result.Live_Together,"DOB": result.DOB,"Career": result.Career,"Income": result.Income,"Remark": result.Remark,"Octopus": result.Octopus,"P_ID": result.P_ID});
                INFO.push({ "ID": result.ID, "Master_member": result.Master_member, "Member_SID": result.Member_SID, "Chinese_Name": result.Chinese_Name, "English_Name": result.English_Name, "Gender": result.Gender, "Relationship": result.Relationship, "Live_Together": result.Live_Together, "DOB": result.DOB, "Career": result.Career, "Income": result.Income, "Remark": result.Remark, "Octopus": result.Octopus, "P_ID": result.P_ID });
              }
              fn(INFO);
              break;
            case "Get_Member_Urgent_Info_by_ID":
              let Get_Member_Urgent_Info_by_ID: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.returnInfo.push({"ID": result.ID,"Master_member": result.Master_member,"Member_SID": result.Member_SID,"Chinese_Name": result.Chinese_Name,"English_Name": result.English_Name,"Gender": result.Gender,"Relationship": result.Relationship,"Live_Together": result.Live_Together,"DOB": result.DOB,"Career": result.Career,"Income": result.Income,"Remark": result.Remark,"Octopus": result.Octopus,"P_ID": result.P_ID});
                Get_Member_Urgent_Info_by_ID.push({ "ID": result.ID, "Member_ID": result.Member_ID, "Name": result.Name, "Phone": result.Phone, "Relationship": result.Relationship });
              }
              fn(Get_Member_Urgent_Info_by_ID);
              break;
            case "Get_Member_Perm_Event":
              let Get_Member_Perm_Event: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                if (result.Member_ID != null) {
                  Get_Member_Perm_Event.push({ "Event_Connect": result.Event_Connect, "Event_Name": result.Event_Name, "Check": true });
                } else {
                  Get_Member_Perm_Event.push({ "Event_Connect": result.Event_Connect, "Event_Name": result.Event_Name, "Check": false });
                }
                fn(Get_Member_Perm_Event);

              }
              break;
            case "Get_Appled_Member_Perm_Event":
              let Get_Appled_Member_Perm_Event: any = [];
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                Get_Appled_Member_Perm_Event.push({ "Event_Connect": result.Event_Connect, "Event_Name": result.Event_Name, "Repeat_Week": result.Repeat_Week, "EID": result.EID, "Member_ID": result.Member_ID });
                fn(Get_Appled_Member_Perm_Event);
              }
              break;
            case "Apply_New_Member":
              this.returnInfo = true;
              break;
            case "Update_Member":
              fn(true);
              break;
            case "Testing":
              this.returnInfo = true;
              break;
            default:
              break;
          }
          // console.log("return info");
          // console.log(this.returnInfo);
          // console.log("return info");
          fn(this.returnInfo);
        } else if (obj['return']) {
          fn();
        }
        else {
          alert("Some ERROR");
          this.returnInfo = "SOMEERROR";
        }
      }
    }

    var obj = { "Function": type, "info": info, "info2": info2, "info3": info3, "info4": info4, "Passcode": Passcode };
    this.log(obj);
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
    console.log(this.link + "Ajax_Member.php?jsonDoc=" + JSON.stringify(obj));

  }
  Member_function_Call(type, info: any = "", info2: any = "", info3: any = "", info4: any = "") {
    return new Promise(resolve => {
      this.Member_function(type, info, info2, info3, info4, resolve);
    });
  }
  log(parm) {
    console.log(parm);
  }
}
