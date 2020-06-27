import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/authGuard/auth.guard';
import { NewUserComponent } from './tab2/new-user/new-user.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo:'/login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) 
  },
  { 
    path: 'novo-evento', 
    loadChildren: () => import('./tab2/new-event/new-event.module').then(m => m.NewEventPageModule),
  },
  {
    path:'new-user',
    component: NewUserComponent
  },
  { 
    path: 'edit-event/:id',
    loadChildren: () => import('./tab2/edit-event/edit-event.module').then(m => m.EditEventPageModule) 
  },
  { 
    path: 'detail-event/:id',
    loadChildren: () => import('./tab2/detail-event/detail-event.module').then(m => m.DetailEventPageModule) 
  },
  { 
    path: 'tabs', 
    canActivate:[ AuthGuard ],
    data: {
      role: ['USER', 'ADMIN']
    },
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'admin-dashboard', 
    canActivate: [ AuthGuard ],
    data: {
      role: 'ADMIN'
    },
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
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
