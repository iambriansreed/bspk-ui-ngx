import { Type } from '@angular/core';
import { ComponentPhase, ComponentSettings } from '.';

export interface Meta {
    version: string;
    components: MetaComponent[];
    hash: string;
}

export type MetaComponent = Pick<ComponentMeta, 'name' | 'phase' | 'slug'> & {
    meta?: () => Promise<ComponentMeta>;
};

export interface ComponentMeta {
    name: string;
    selector: string;
    className: string;
    description: string;
    phase?: ComponentPhase;
    class: Type<any>;
    slug: string;
    directive: boolean;
    inputs: ComponentMetaInput[];
    outputs: ComponentMetaOutput[];
    file: string;
    css: string;
    associatedTypes?: {
        name: string;
        file: string;
        props: ComponentMetaInput[];
    }[];
    hasContent: boolean;
    basicUsage?: {
        template: string;
        classCode?: string;
        component: Type<any>;
        inputs?: Record<string, any>;
    };
    variants?: {
        name: string;
        options: {
            name: string;
            template: string;
            classCode?: string;
            component: Type<any>;
        }[];
    }[];
    /** Deprecated */
    exampleComponent?: Type<any>;
    settings?: ComponentSettings;
}

export interface ComponentMetaOutput {
    name: string;
    description?: string;
    type?: string[] | string;
    required?: boolean;
}

export interface ComponentMetaInput {
    name: string;
    description?: string;
    type?: string[] | string;
    exampleType?: string;
    default?: string;
    required?: boolean;
    variants?: string[];
    references?: string[];
    minimum?: number;
    maximum?: number;
    example?: string;
    arrayType?: string;
    label?: string;
    disabled?: boolean;
}

export interface InputsClassItem extends Partial<{
    name: string;
    deprecated: boolean;
    deprecationMessage: string;
    type: string;
    indexKey: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
    required: boolean;
    defaultValue?: string;
}> {}
