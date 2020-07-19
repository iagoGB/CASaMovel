import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSpeakerPage } from './new-speaker.page';

const routes: Routes = [
  {
    path: '',
    component: NewSpeakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSpeakerPageRoutingModule {}
