import { NgComponentOutlet } from '@angular/common';
import { Component, signal, computed, input, inject, Type, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMeta, ComponentMetaContent } from '@shared/types';
import { UITag } from '@ui/tag';
import { UIFlexDirective } from '../../../ui/src';
import { COMPONENT_PHASE_COLORS } from '../utils';
import { AppExample } from './example';
import { AppMarkup } from './markup';
import { Syntax } from './syntax';
import { TypeProps } from './type-props';

interface ContentItemProps {
    component: Type<any>;
    description?: string;
    inputs?: any;
    title?: string;
}

@Component({
    host: { style: 'display: contents;' },
    selector: 'app-content-item',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [AppExample, AppMarkup],
    template: `<!-- -->
        @if (content().title) {
            <h3 style="margin-top: var(--spacing-sizing-08);">{{ content().title }}</h3>
        }

        @if (content().description) {
            <app-markup [source]="content().description"></app-markup>
        }

        <app-example [component]="content().component" [inputs]="content().inputs" [selector]="selector()" />`,
})
export class AppContentItem {
    contentItem = input<ContentItemProps>();

    selector = input<string>('');

    content = computed(() => this.contentItem() || ({} as ContentItemProps));
}

@Component({
    selector: 'app-component-doc',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [UITag, TypeProps, UIFlexDirective, AppMarkup, Syntax, NgComponentOutlet, AppExample, AppContentItem],
    template: `
        <div
            [ui-flex]="{ direction: 'row', align: 'center', justify: 'start', gap: '16' }"
            style="margin-bottom: var(--spacing-sizing-04);">
            <h2 style="display: flex; align-items: center; gap: 1rem;">
                {{ component().name }}
            </h2>
            <span style="margin-left: auto;"><ui-tag [color]="phaseColor()" [label]="component().phase!" /></span>
        </div>

        <app-markup [source]="component().description" />

        @for (contentItem of content('afterDescription'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }

        @if (basicUsage()) {
            <h3>Basic Usage</h3>
            <app-example
                [template]="basicUsage()!.template"
                [component]="basicUsage()!.component"
                [inputs]="basicUsage()!.inputs || {}" />
        }

        @for (contentItem of content('afterBasicUsage'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }

        @if (this.component().inputs && this.component().inputs.length) {
            <h3>Inputs</h3>
            <app-type-props [props]="this.component().inputs" />
        }

        @for (contentItem of content('afterInputs'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }

        @if (this.component().outputs && this.component().outputs.length) {
            <h3>Outputs</h3>
            <app-type-props [props]="this.component().outputs" />
        }

        @for (contentItem of content('afterOutputs'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }

        @if (component().associatedTypes?.length) {
            <h3>Associated Types</h3>
            @for (type of component().associatedTypes; track $index) {
                <h4>{{ type.name }}</h4>
                <app-type-props [props]="type.props" />
            }
        }

        @for (contentItem of content('afterAssociatedTypes'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }

        @if (exampleComponent()) {
            <h3>Examples</h3>
            <ng-container [ngComponentOutlet]="exampleComponent()!"></ng-container>
        }

        @for (contentItem of content('afterExamples'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }

        <h3>Stylesheet</h3>
        @if (component().css) {
            <p>This is the CSS for the component. The css variables used within are available in the styles package.</p>
        } @else if (!component().css) {
            <p>This component does not have any specific styles.</p>
        }

        @if (component().css) {
            <app-syntax
                [source]="component().css"
                [language]="'css'"
                style="margin-top: 2rem;"
                [pretty]="true"></app-syntax>
        }

        @for (contentItem of content('afterStylesheet'); track $index) {
            <app-content-item [contentItem]="contentItem" [selector]="component().selector" />
        }
    `,
})
export class ComponentDoc {
    component = input.required<ComponentMeta>();

    phaseColor = computed(() => {
        const phase = this.component().phase;
        return phase ? COMPONENT_PHASE_COLORS[phase] : 'grey';
    });

    basicUsage = computed(() => {
        return this.component().basicUsage || this.component().settings?.basicUsage;
    });

    /**
     * @deprecated This will be removed when static example components are removed. Use `content` with `position:
     *   'afterExamples'` instead for adding custom example components.
     */
    exampleComponent = computed(() => {
        return this.component().settings?.hideExamples ? null : this.component().exampleComponent;
    });

    content(position: ComponentMetaContent['position']): ContentItemProps[] {
        return (
            this.component()
                .settings?.content?.filter((c) => c.position === position)
                ?.map((c) => {
                    if ('inputs' in c.component)
                        return {
                            ...c.component,
                            component: this.component().class,
                        };

                    return {
                        component: c.component as Type<any>,
                    };
                }) || []
        );
    }
}

@Component({
    selector: 'app-component-page',
    standalone: true,
    imports: [ComponentDoc],
    template: ` @if (errorLoading()) {
            <h2>Component Not Found</h2>
        } @else {
            <app-component-doc [component]="component()!" />
        }`,
})
export class ComponentPage {
    activatedRoute = inject(ActivatedRoute);

    component = signal<ComponentMeta | undefined>(this.activatedRoute.snapshot.data['meta']);

    errorLoading = signal(false);

    timeoutHandle?: number;

    constructor() {
        this.activatedRoute.data.subscribe((data) => {
            this.component.set(data['meta']);
            this.errorLoading.set(false);
        });
    }
}
