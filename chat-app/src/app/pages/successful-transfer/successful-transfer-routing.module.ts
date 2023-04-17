import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfulTransferPage } from './successful-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessfulTransferPageRoutingModule {}
