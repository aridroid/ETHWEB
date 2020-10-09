import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGaurd } from './login-gaurd.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [LoginGaurd]
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
    loadChildren: () => import('./new-entry/new-entry.module').then( m => m.NewEntryPageModule),
    canLoad: [LoginGaurd]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [LoginGaurd]
  },
  {
    path: 'about-us',
    loadChildren: () => import('./local/about-us/about-us.module').then( m => m.AboutUsPageModule),
    canLoad: [LoginGaurd]
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./local/contact-us/contact-us.module').then( m => m.ContactUsPageModule),
    canLoad: [LoginGaurd]
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./local/terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule),
    canLoad: [LoginGaurd]
  },
  {
    path: 'inactive-users',
    loadChildren: () => import('./inactive-users/inactive-users.module').then( m => m.InactiveUsersPageModule),
    canLoad: [LoginGaurd]
  },
  {
    path: 'search-page',
    loadChildren: () => import('./search-page/search-page.module').then( m => m.SearchPagePageModule),
    canLoad: [LoginGaurd]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
