import { Routes } from '@angular/router';
import { CountryComponent } from './main-page/country/country.component';
import { CountryDetailsComponent } from './main-page/country-details/country-details.component';

export const routes: Routes = [
  { path: '', component: CountryComponent },
  { path: 'country/:name', component: CountryDetailsComponent },
  { path: '**', redirectTo: '' },
];
