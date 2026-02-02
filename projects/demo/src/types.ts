import { Route } from '@angular/router';

export type NavRoute = Route & {
    hide?: boolean;
    title: string;
    //children?: NavRoute[];
    //section?: boolean;
};
