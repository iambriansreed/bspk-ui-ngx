import { ComponentPhase } from '.';

export interface Meta {
    version: string;
    components: ComponentMeta[];
    hash: string;
}

export interface ComponentMeta {
    name: string;
    className: string;
    /** The code sample provided in the component's JSDoc @example. */
    example?: string;
    description: string;
    phase?: ComponentPhase;
    slug: string;
    directive: boolean;
    /**
     * If the component has an associated example component, this will include the name and path to that component for
     * use in the documentation site.
     */
    exampleComponent?: {
        name: string;
        path: string;
    };
    props: ComponentMetaProp[];
    file: string;
    css: string;
    associatedTypes?: {
        name: string;
        file: string;
        props: ComponentMetaProp[];
    }[];
}

export interface ComponentMetaProp {
    name: string;
    description?: string;
    type?: string[] | string;
    exampleType?: string;
    default?: string;
    required?: boolean;
    options?: number[] | string[];
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
