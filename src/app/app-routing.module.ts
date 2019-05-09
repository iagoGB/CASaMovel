import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch: 'full'},
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'new-event', loadChildren: './tab2/new-event/new-event.module#NewEventPageModule' },
  { path: 'edit-event/:id', loadChildren: './tab2/edit-event/edit-event.module#EditEventPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
