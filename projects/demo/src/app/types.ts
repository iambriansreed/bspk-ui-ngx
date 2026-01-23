import { Route } from '@angular/router';

export type NavRoute = Route & {
    hide?: boolean;
    //children?: NavRoute[];
    //section?: boolean;
};

export interface ComponentDemo {
    name: string;
    description: string;
    phase: ComponentPhase;
    descriptionExample?: string;
    example: string;
}

export type ComponentPhase = 'Backlog' | 'Dev' | 'Stable' | 'Utility' | 'UXReview';
