import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessfulTransferPageRoutingModule } from './successful-transfer-routing.module';

import { SuccessfulTransferPage } from './successful-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessfulTransferPageRoutingModule
  ],
  declarations: [SuccessfulTransferPage]
})
export class SuccessfulTransferPageModule {}
