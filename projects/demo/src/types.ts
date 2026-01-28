import { Route } from '@angular/router';
import { ComponentPhase } from '@shared/types';

export type NavRoute = Route & {
    hide?: boolean;
    title: string;
    //children?: NavRoute[];
    //section?: boolean;
};

export interface Meta {
    version: string;
    components: ComponentDemo[];
    hash: string;
}

export interface ComponentDemo {
    name: string;
    className: string;
    description: string;
    phase: ComponentPhase;
    descriptionExample?: string;
    slug: string;
    directive: boolean;
    example: {
        name: string;
        path: string;
    };
}
