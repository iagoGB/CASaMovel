import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/authGuard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch: 'full'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'new-event', loadChildren: './tab2/new-event/new-event.module#NewEventPageModule' },
  { path: 'edit-event/:id', loadChildren: './tab2/edit-event/edit-event.module#EditEventPageModule' },
  { path: 'detail-event/:id', loadChildren: './tab2/detail-event/detail-event.module#DetailEventPageModule' },
  { path: 'tabs', 
    canActivate:[ AuthGuard ],
    loadChildren: './tabs/tabs.module#TabsPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
