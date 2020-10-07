import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InactiveUsersPage } from './inactive-users.page';

const routes: Routes = [
  {
    path: '',
    component: InactiveUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InactiveUsersPageRoutingModule {}
