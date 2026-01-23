import { componentItems } from './routes/generated';
import { HomeRouteComponent } from './routes/home';
import { NavRoute } from './types';

export const routes: NavRoute[] = [
    { path: '', component: HomeRouteComponent, hide: true, title: 'BSPK' },

    ...componentItems,

    { path: '**', redirectTo: '', title: "404'd", hide: true },
];
