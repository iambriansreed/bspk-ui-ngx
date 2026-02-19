import { NgComponentOutlet } from '@angular/common';
import { Component, signal, computed, input, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMeta } from '@shared/types';
import { UITag } from '@ui/tag';
import { UICard, UIFlexDirective } from '../../../ui/src';
import { COMPONENT_PHASE_COLORS } from '../utils';
import { Markup } from './markup';
import { Syntax } from './syntax';
import { TypeProps } from './type-props';

@Component({
    selector: 'app-component-doc',
    standalone: true,
    imports: [UITag, TypeProps, UIFlexDirective, Markup, Syntax, NgComponentOutlet, UICard],
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

        @if (component().basicUsage) {
            <h3>Basic Usage</h3>
            <ui-card variant="outlined">
                <div
                    style="display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    border-bottom: solid 1px var(--stroke-neutral-low-contrast);
                    padding: var(--spacing-sizing-04);
                    position: relative;
                    background-color: var(--background-shade);">
                    <ng-container [ngComponentOutlet]="component().basicUsage!.component"></ng-container>
                </div>
                <app-syntax
                    [source]="component().basicUsage!.template"
                    language="html"
                    style="margin-top: 2rem;"
                    [pretty]="true"></app-syntax>
            </ui-card>
        }

        @if (this.component().inputs && this.component().inputs.length) {
            <h3>Inputs</h3>
            <app-type-props [props]="this.component().inputs" />
        }

        @if (this.component().outputs && this.component().outputs.length) {
            <h3>Outputs</h3>
            <app-type-props [props]="this.component().outputs" />
        }

        @if (component().associatedTypes?.length) {
            <h3>Associated Types</h3>
            @for (type of component().associatedTypes; track $index) {
                <h4>{{ type.name }}</h4>
                <app-type-props [props]="type.props" />
            }
        }

        @if (component().exampleComponent) {
            <h3>Examples</h3>
            <ng-container [ngComponentOutlet]="component().exampleComponent!"></ng-container>
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
    `,
})
export class ComponentDoc {
    component = input.required<ComponentMeta>();

    phaseColor = computed(() => {
        const phase = this.component().phase;
        return phase ? COMPONENT_PHASE_COLORS[phase] : 'grey';
    });
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
        effect(() => {
            if (this.component()) return;
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = setTimeout(() => {
                this.errorLoading.set(true);
            }, 1000);
        });

        this.activatedRoute.data.subscribe((data) => {
            this.component.set(data['meta']);
            this.errorLoading.set(false);
        });
    }
}
