/** generated: 2025-10-29T18:36:35.100Z */
import { AccordionRouteComponent, BadgeRouteComponent, ButtonRouteComponent, CardRouteComponent, DialogRouteComponent, DrawerRouteComponent, ModalRouteComponent, TooltipRouteComponent } from './routes/components';
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
