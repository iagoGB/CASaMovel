import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPage } from './admin-dashboard.page';
import { SharedComponentModule } from '../shared-component.module';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
