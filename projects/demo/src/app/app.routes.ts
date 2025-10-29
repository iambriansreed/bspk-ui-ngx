import { Route, Routes } from '@angular/router';
import { HomeRouteComponent } from './routes/home-route.component';
import { ButtonRouteComponent } from './routes/button-route.component';
import { CardRouteComponent } from './routes/card-route.component';
import { AccordionRouteComponent } from './routes/accordion-route.component';
import { TooltipRouteComponent } from './routes/tooltip-route.component';

type NavRoute = Route & { hide?: boolean; title: string; children?: NavRoute[]; section?: boolean };

export const navigationItems: NavRoute[] = [
  { path: '', component: HomeRouteComponent, hide: true, title: 'Home' },
  {
    title: 'Components',
    section: true,
  },
  { path: 'button', component: ButtonRouteComponent, title: 'Button' },
  { path: 'card', component: CardRouteComponent, title: 'Card' },
  { path: 'accordion', component: AccordionRouteComponent, title: 'Accordion' },
  { path: 'tooltip', component: TooltipRouteComponent, title: 'Tooltip' },

  //
  { path: '**', redirectTo: '', title: "404'd", hide: true }, // Wildcard route for 404 cas
];

export const routes: Routes = navigationItems.filter((route) => !route.section);
