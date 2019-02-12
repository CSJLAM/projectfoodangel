import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateVersionPage } from './update-version';

@NgModule({
  declarations: [
    UpdateVersionPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateVersionPage),
  ],
})
export class UpdateVersionPageModule {}
