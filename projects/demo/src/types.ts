import { Route } from '@angular/router';

export type NavRoute = Route & {
    hide?: boolean;
    title: string;
};
