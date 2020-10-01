import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewEntryPageRoutingModule } from './new-entry-routing.module';

import { NewEntryPage } from './new-entry.page';
import { ImagePickerComponent } from '../image-picker/image-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEntryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewEntryPage, ImagePickerComponent]
})
export class NewEntryPageModule {}
