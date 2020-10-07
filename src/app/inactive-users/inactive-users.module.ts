import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InactiveUsersPageRoutingModule } from './inactive-users-routing.module';

import { InactiveUsersPage } from './inactive-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InactiveUsersPageRoutingModule
  ],
  declarations: [InactiveUsersPage]
})
export class InactiveUsersPageModule {}
