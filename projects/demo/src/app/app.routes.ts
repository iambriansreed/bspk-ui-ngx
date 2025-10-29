import { Route, Routes } from '@angular/router';
import { HomeRouteComponent } from './routes/home';
import { ButtonRouteComponent } from './routes/button';
import { CardRouteComponent } from './routes/card';
import { AccordionRouteComponent } from './routes/accordian';
import { TooltipRouteComponent } from './routes/tooltip';
import { ModalRouteComponent } from './routes/modal';
import { DialogRouteComponent } from './routes/dialog';
import { DrawerRouteComponent } from './routes/drawer';
import { BadgeRouteComponent } from './routes/badge';

type NavRoute = Route & { hide?: boolean; title: string; children?: NavRoute[]; section?: boolean };

export const navigationItems: NavRoute[] = [
  { path: '', component: HomeRouteComponent, hide: true, title: 'Home' },

  { title: 'Components', section: true },
  { path: 'button', component: ButtonRouteComponent, title: 'Button' },
  { path: 'card', component: CardRouteComponent, title: 'Card' },
  { path: 'accordion', component: AccordionRouteComponent, title: 'Accordion' },
  { path: 'tooltip', component: TooltipRouteComponent, title: 'Tooltip' },
  { path: 'modal', component: ModalRouteComponent, title: 'Modal' },
  { path: 'dialog', component: DialogRouteComponent, title: 'Dialog' },
  { path: 'drawer', component: DrawerRouteComponent, title: 'Drawer' },
  { path: 'badge', component: BadgeRouteComponent, title: 'Badge' },


  { path: '**', redirectTo: '', title: "404'd", hide: true },
];

export const routes: Routes = navigationItems.filter((route) => !route.section);
