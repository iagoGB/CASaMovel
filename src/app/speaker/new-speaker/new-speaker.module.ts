import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSpeakerPageRoutingModule } from './new-speaker-routing.module';

import { NewSpeakerPage } from './new-speaker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewSpeakerPageRoutingModule
  ],
  declarations: [NewSpeakerPage]
})
export class NewSpeakerPageModule {}
