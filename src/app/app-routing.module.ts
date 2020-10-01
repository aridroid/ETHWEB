import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'new-entry',
    loadChildren: () => import('./new-entry/new-entry.module').then( m => m.NewEntryPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./local/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./local/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./local/terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
