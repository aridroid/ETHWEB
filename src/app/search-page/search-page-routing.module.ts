import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPagePage } from './search-page.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPagePage
  },
  {
    path: 'search-result',
    loadChildren: () => import('./search-result/search-result.module').then( m => m.SearchResultPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPagePageRoutingModule {}
