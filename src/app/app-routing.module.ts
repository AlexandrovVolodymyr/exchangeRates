import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/exchange',
    pathMatch: 'full'
  },
  {
    path: 'exchange',
    loadChildren: () => import('./modules/exchange/exchange.module').then(m => m.ExchangeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
