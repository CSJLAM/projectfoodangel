import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PermissionSettingPage } from './permission-setting';

@NgModule({
  declarations: [
    PermissionSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(PermissionSettingPage),
  ],
})
export class PermissionSettingPageModule {}
