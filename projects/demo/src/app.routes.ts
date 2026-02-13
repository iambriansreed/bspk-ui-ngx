import { NavRoute } from '@shared/types';
import { componentItems } from './generated/routes';
import { HomeRouteComponent } from './routes/home';

export const routes: NavRoute[] = [
    { path: '', component: HomeRouteComponent, hide: true, title: 'BSPK' },

    ...componentItems,

    { path: '**', redirectTo: '', title: "404'd", hide: true },
];
