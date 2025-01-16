import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'details/:id',
      component: CountryDetailsComponent,
    },
    {
      path: '404', // wildcard
      component: NotFoundComponent,
    },
    {
      path: '**', // wildcard
      component: NotFoundComponent,
    },
  ];
