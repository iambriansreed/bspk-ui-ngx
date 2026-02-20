import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { ComponentMeta, MetaComponent } from './meta';

export * from './meta';

export type ComponentPhase = 'Backlog' | 'Dev' | 'Stable' | 'Utility' | 'UXReview';

export type PrettyParser = 'css' | 'estree' | 'html' | 'scss' | 'typescript';

export type NavRoute = Route & {
    hide?: boolean;
    title: string;
    data?: MetaComponent;
};

/*
Settings for generating tests and documentation
*/
export interface ComponentSettings<P extends Record<string, any> = Record<string, any>> {
    /**
     * The input values which override default values or add a default value for component inputs demos.
     *
     * These values are used for generating the variant examples, and test examples.
     *
     * @example
     *     defaultValues = {
     *         singleOpen: true,
     *     };
     */
    defaultValues?: Record<string, any>;
    /**
     * @example
     *     ngContent = `
     *         <ui-accordion-section title="Section 1"><p>Section 1 content</p></ui-accordion-section>
     *         <ui-accordion-section title="Section 2"><p>Section 2 content</p></ui-accordion-section>
     *         <ui-accordion-section title="Section 3"><p>Section 3 content</p></ui-accordion-section>
     *         <ui-accordion-section title="Section 4"><p>Section 4 content</p></ui-accordion-section>
     *     `;
     *
     * @example
     *     // Or, for more complex examples that require additional imports:
     *
     *     ngContent = {
     *         imports: ['UIAccordionSection'],
     *         template: `
     *             <ui-accordion-section title="Section 1"><p>Section 1 content</p></ui-accordion-section>
     *             <ui-accordion-section title="Section 2"><p>Section 2 content</p></ui-accordion-section>
     *             <ui-accordion-section title="Section 3"><p>Section 3 content</p></ui-accordion-section>
     *             <ui-accordion-section title="Section 4"><p>Section 4 content</p></ui-accordion-section>
     *         `,
     *     };
     */
    ngContent?:
        | string
        | {
              template: string;
              imports: string[];
          };

    /**
     * An optional object where keys are prop names and values are either false (to skip generating examples for that
     * prop) or a function that takes the variant prop data and returns modified variant prop data
     *
     * @example
     *     variants = {
     *         // To exclude the color red from example generation:
     *         color: (variantPrev) => ({
     *             ...variantPrev,
     *             values: variantPrev.values.filter((v) => v.valueName !== 'red'),
     *         }),
     *     };
     */
    variants?: Partial<Record<keyof P, false | ((variantPrev: Variants) => Variants)>> | false;

    /**
     * Additional content to be added to the documentation page, such as additional examples or usage instructions. The
     * position field determines where the content will be placed on the page (e.g. afterDescription, afterExamples,
     * etc).
     *
     * Will be expanded in the future to support additional content types such as markdown, and to allow for more
     * flexible positioning.
     */
    content?: ComponentMetaContent<P>[];

    /**
     * Replaces the default generated example with a custom example component. This is useful for components with more
     * complex usage that cannot be easily captured in the default example format, or for components that require
     * additional setup or context to demonstrate effectively. If this field is provided, the default example will be
     * ignored and the provided component will be used instead.
     */
    basicUsage?: ComponentMeta['basicUsage'];

    /**
     * Hides the examples section entirely.
     *
     * @deprecated This will be removed when static example components are removed.
     */
    hideExamples?: boolean;
}

export interface ComponentMetaContent<P = any> {
    component:
        | Type<any>
        // This only works for components without ng-content.
        | {
              description?: string;
              inputs: P;
              title?: string;
          };
    position:
        | 'afterAssociatedTypes'
        | 'afterBasicUsage'
        | 'afterDescription'
        | 'afterExamples'
        | 'afterInputs'
        | 'afterOutputs'
        | 'afterStylesheet';
    code?: string;
}

/** Precursor to ComponentExamples used for generating example components and code snippets */

interface Variants {
    name: string;
    values: { valueName: string; value: boolean | number | string }[];
}

/** Component example definitions used for documentation */
export interface ComponentExamples<T = Type<any>> {
    default: {
        description?: string;
        // needed for generating example code under the component
        code: string;
        selector: string;
        component: T;
    };
    variants?: {
        variantName: string;
        description?: string;
        options: {
            description?: string;
            variantValue: boolean | number | string;
            // needed for generating example code under the component
            code: string;
            selector: string;
            component: T;
        }[];
    }[];
}
