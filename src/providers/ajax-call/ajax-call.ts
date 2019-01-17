//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the AjaxCallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AjaxCallProvider {
  returnInfo: any;
  link:string="http://101.78.175.101:8580/foodangel/";
  constructor() {
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
        this.returnInfo = false;
        break;
      case "Load_Staff_Info":
        this.returnInfo = [];
        break;
    }
    var xmlhttp = new XMLHttpRequest();
    var url = this.link+"checkUser.php";
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
  getEvents(location, type, info, fn) {

    var xmlhttp = new XMLHttpRequest();
    var url = this.link+"Ajax_GetInfo.php";
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
            case "Load_Event_Attend":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                //this.log(Your);
                //this.log('++');
                this.returnInfo.push({ "Attend": result.Attend, "Event_ID": result.Event_ID, "Chinese_Name": result.Chinese_Name,"Octopus": result.Octopus ,"Member_ID": result.Member_ID, "Member_ID_F": result.Member_ID_F });

              }
              break;
            case "Load_All_Perm_Event":
            case "Load_All_Single_Event":
            case "Load_All_Outdated_Event":
            for (var i = 0; i < obj.info.length; i++) {
              var result = obj.info[i];
              //this.log(Your);
              //this.log('++');
              this.returnInfo.push({ "ID": result.ID, "Event_Name": result.Event_Name, "Room": result.Room ,"Start_Date":result.Start_Date});
              
            }
            break;
            case "Get_Campus":
            for (var i = 0; i < obj.info.length; i++) {
              var result = obj.info[i];
              this.returnInfo.push({ "ID": result.ID, "Room": result.Room, "Campus_ID": result.Campus_ID ,"Location":result.Location});
            }
            break;
            case "Get_Event_Cate":
            for (var i = 0; i < obj.info.length; i++) {
              var result = obj.info[i];
              this.returnInfo.push({ "ID": result.ID, "Name": result.Name, "Type": result.Type ,"Event_For":result.Event_For,"Cate_Name":result.Cate_Name});
            }
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

    var obj = { "Passcode": "GetInfo", "Function": type, "info": info };
    this.log(this.link+"Ajax_GetInfo.php?jsonDoc=" + JSON.stringify(obj));
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  getEvents_Call(location, type, info = "") {
    return new Promise(resolve => {
      this.getEvents(location, type, info, resolve);
    });
  }
  setEvents(location, type, info, info2, fn) {

    var xmlhttp = new XMLHttpRequest();
    var url = this.link+"Ajax_GetInfo.php";
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
           
                this.returnInfo=true;
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

    var obj = { "Passcode": "SetInfo", "Function": type, "info": info, "info2":info2 };
    this.log(this.link+"Ajax_GetInfo.php?jsonDoc=" + JSON.stringify(obj));
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  setEvents_Call(location, type, info = "", info2="") {
    return new Promise(resolve => {
      this.setEvents(location, type, info, info2, resolve);
    });
  }
  AddEvents(type, info,info2,info3, fn) {

    var xmlhttp = new XMLHttpRequest();
    var url = this.link+"Ajax_SetInfo.php";
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
              this.returnInfo=true;
              break;
              case "Attened_Evnet":
              for (var i = 0; i < obj.info.length; i++) {
                var result = obj.info[i];
                this.returnInfo.push({ "Chinese_Name": result.Chinese_Name, "Member_ID": result.Member_ID});
              }
            default:
            break;
          }
          fn(this.returnInfo);

        } else if (obj.errorCode != null) {

          this.log(obj.errorCode);
        }



      }
    }

    var obj = { "Passcode": "SetIt", "Function": type, "info": info,"info2":info2 ,"info3":info3 };
    this.log("jsonDoc=" + JSON.stringify(obj));
    xmlhttp.send("jsonDoc=" + JSON.stringify(obj));


  }
  AddEvents_Call(type, info :any="",info2:any ="",info3:any="") {
    return new Promise(resolve => {
      this.AddEvents(type, info, info2, info3, resolve);
    });
  }

  transform_to_group(value: any, groupByKey: string) {
    const events: any[] = [];
    const groupedElements: any = {};

    value.forEach((obj: any) => {
      if (!(obj[groupByKey] in groupedElements)) {
        groupedElements[obj[groupByKey]] = [];
      }
      groupedElements[obj[groupByKey]].push(obj);
    });

    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        events.push({
          key: prop,
          list: groupedElements[prop]
        });
      }
    }

    return events;
  }
  Member_function(type, info, info2, info3, info4, fn) {
    var Passcode ="";
    switch (type) {
      case "List_Member_Type":
      case "List_Member":
      case "List_Applyed_Event":
      case "List_Pass_Event":
      case "Apply_Get_Perm_Event":
      // case "List_Member_Type_Event_Type":
      case "List_Member_Type_Perm_Event_Type":
      Passcode="GetMember";
        this.returnInfo = [];
        break;
     case "Apply_New_Member":
     case "Testing":
     Passcode="SetMember";
     this.returnInfo="";
     break;
     
    }
    var xmlhttp = new XMLHttpRequest();
    var url = this.link+"Ajax_Member.php";
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
              this.returnInfo.push({ "ID": result.ID, "Name": result.Name ,"Type":result.Type,"Event_For":result.Event_For});
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
                this.returnInfo.push({ "Event_Connect": result.Event_Connect, "Event_Name": result.Event_Name ,"Check":false});
              }
              break;
              case "Apply_New_Member":
              this.returnInfo=true;
              break;
              case "Testing":
              this.returnInfo=true;
              break;
            default:
              break;
          }
          // console.log("return info");
          // console.log(this.returnInfo);
          // console.log("return info");
          fn(this.returnInfo);
        }else if (obj['return']) {
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
    console.log("jsonDoc=" + JSON.stringify(obj));

  }
  Member_function_Call(type, info :any="",info2:any ="",info3:any="",info4:any="") {
    return new Promise(resolve => {
      this.Member_function(type, info, info2, info3, info4, resolve);
    });
  }
  log(parm) {
    console.log(parm);
  }
}
