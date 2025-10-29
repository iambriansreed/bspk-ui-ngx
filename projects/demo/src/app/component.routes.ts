/**
@generated: 2025-10-29T18:03:31.696Z
*/
import { AccordionRouteComponent } from './routes/accordion';
import { BadgeRouteComponent } from './routes/badge';
import { ButtonRouteComponent } from './routes/button';
import { CardRouteComponent } from './routes/card';
import { DialogRouteComponent } from './routes/dialog';
import { DrawerRouteComponent } from './routes/drawer';
import { ModalRouteComponent } from './routes/modal';
import { TooltipRouteComponent } from './routes/tooltip';
import { NavRoute } from './types';

export const componentItems: NavRoute[] = [
  { title: 'Components', section: true },
  { path: 'accordion', component: AccordionRouteComponent, title: 'Accordion' },
  { path: 'badge', component: BadgeRouteComponent, title: 'Badge' },
  { path: 'button', component: ButtonRouteComponent, title: 'Button' },
  { path: 'card', component: CardRouteComponent, title: 'Card' },
  { path: 'dialog', component: DialogRouteComponent, title: 'Dialog' },
  { path: 'drawer', component: DrawerRouteComponent, title: 'Drawer' },
  { path: 'modal', component: ModalRouteComponent, title: 'Modal' },
  { path: 'tooltip', component: TooltipRouteComponent, title: 'Tooltip' },
];
