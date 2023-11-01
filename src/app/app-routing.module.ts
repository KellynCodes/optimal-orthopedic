import { ProviderComponent } from './components/provider/provider.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'Home',
    children: [
      {
        path: 'provider/:name',
        component: ProviderComponent,
      },

      {
        path: 'physician/:name',
        component: ProviderComponent,
      },
    ],
  },

  { path: 'not-found', component: NotFoundComponent, title: 'Page Not Found' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
