/**
 * This file is used to build the meta types for the project. It's used in the ".scripts/generate-meta.ts" file and also
 * copied in to the meta output file.
 */

export interface BaseMeta {
    name: string;
    description?: string;
    file: string;
    example?: string;
}

export type TypeMeta = BaseMeta & {
    id: string;
    references?: string[];
    properties?: TypeProperty[];
    components?: string[];
};

export interface TypeProperty {
    name: string;
    description?: string;
    type?: string[] | string;
    exampleType?: string;
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
    references?: string[];
    minimum?: number;
    maximum?: number;
    example?: string;
    arrayType?: string;
}

export type ComponentMeta = BaseMeta & {
    slug: string;
    dependencies: string[];
    css: string;
    hasTouchTarget: boolean;
    usage?: {
        code: string;
        description?: string;
    };
    phase: ComponentPhase;
    generated?: boolean;
    directive?: boolean;
    exampleFile?: {
        name: string;
        path: string;
    };
    className: string;
    associatedTypes?: TypeMeta[];
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

export type ComponentPhase = 'Backlog' | 'Dev' | 'Stable' | 'Utility' | 'UXReview';

export interface Meta {
    version: string;
    components: ComponentMeta[];
    hash: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
