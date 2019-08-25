import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedComponentModule } from '../shared-component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    
  ],
  declarations: [
    Tab1Page
  ]
})
export class Tab1PageModule {}
