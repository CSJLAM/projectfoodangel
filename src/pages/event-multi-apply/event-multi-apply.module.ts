import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventMultiApplyPage } from './event-multi-apply';

@NgModule({
  declarations: [
    EventMultiApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(EventMultiApplyPage),
  ],
})
export class EventMultiApplyPageModule {}
