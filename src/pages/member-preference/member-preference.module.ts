import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberPreferencePage } from './member-preference';

@NgModule({
  declarations: [
    MemberPreferencePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberPreferencePage),
  ],
})
export class MemberPreferencePageModule {}
