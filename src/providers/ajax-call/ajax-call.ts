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
  
  constructor() {
    console.log('Hello AjaxCallProvider Provider');
  }


  // Deptlisting(type, info, info2, info3) {
  //   switch (type) {
  //     case "Show_Dept":
  //       this.returnInfo = [];
  //       break;
  //     case "Add_Dept":
  //     case "Edit_Dept":
  //       this.returnInfo = false;
  //       break;
  //   }

  //   var xmlhttp = new XMLHttpRequest();
  //   var url = "http://101.78.175.101:8580/foodangel/checkUser.php";
  //   xmlhttp.open("POST", url, true);
  //   xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   xmlhttp.onreadystatechange = () => { //Call a function when the state changes.
  //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  //       var obj = JSON.parse(xmlhttp.responseText);
  //       if (obj['result']) {
  //         switch (type) {
  //           case "Show_Dept":
  //             console.info(obj.info);
  //             //for(var i = 0, count=10; i < obj.some.length; i++)

  //             for (var i = 0; i < obj.info.length; i++) {
  //               var result = obj.info[i];
  //               //this.log(Your);
  //               //this.log('++');
  //               this.returnInfo.push({ "ID": result.ID, "Dept_Name": result.Dept_Name, "Dept_Hash": result.Dept_Hash });
  //             }
  //             break;
  //           case "Add_Dept":
  //             this.returnInfo = true;
  //             this.returnInfo2 = true;
  //             //return this.returnInfo;
  //             break;
  //           case "Edit_Dept":
  //             this.returnInfo = true;
  //             this.returnInfo2 = true;
  //             break;
  //           //case "Change_PW":
  //           default:

  //             break;
  //         }



  //       }
  //       else {
  //         alert("Some ERROR");
  //         this.returnInfo = "SOMEERROR";

  //         // let alert = this.alertCtrl.create({
  //         //   title: 'Some issue!',
  //         //   subTitle: 'Internet Error',
  //         //   buttons: ['OK']
  //         // });
  //         // alert.present();

  //       }

  //     }


  //   }

  //   var obj = { "Function": type, "info": info, "info2": info2, "info3": info3, "Passcode": "CheckME" };
  //   this.log(obj);

  //   //var obj = { "Username": this.Username, "Password": this.Password };

  //   xmlhttp.send("jsonDoc=" + JSON.stringify(obj));
  //   console.log(this.returnInfo + "my return info1");
  //   return this.returnInfo;

  // }
  Deptlisting(type, info, info2, info3,fn) {
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
        this.returnInfo=[];
      break;
    }
    var xmlhttp = new XMLHttpRequest();
    var url = "http://101.78.175.101:8580/foodangel/checkUser.php";
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
              this.returnInfo.push({'ID':obj.info.ID,'Staff_ID':obj.info.Staff_ID,'Staff_Hash':obj.info.Staff_Hash,'Username':obj.info.Username,'Name':obj.info.Name,'Password':"",'Password2':"",'Staff_Dept':obj.info.Staff_Dept,'Staff_Join':obj.info.Staff_Join,'Staff_End':obj.info.Staff_End,'Create_By':""});
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
      this.Deptlisting(type, info, info2,info3,resolve);
    });
}


  log(parm) {
    console.log(parm);
  }
}
