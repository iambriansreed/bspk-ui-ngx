import { Routes } from '@angular/router';
import { HomeRouteComponent } from './routes/home';
import { componentItems } from './component.routes';
import { NavRoute } from './types';

export const navigationItems: NavRoute[] = [
  { path: '', component: HomeRouteComponent, hide: true, title: 'Home' },

  ...componentItems,

  { path: '**', redirectTo: '', title: "404'd", hide: true },
];

export const routes: Routes = navigationItems.filter((route) => !route.section);
