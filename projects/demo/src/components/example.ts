import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input, signal, Type, ViewEncapsulation } from '@angular/core';
import { IconContentCopy, IconRefresh, UIButton, UICard } from '@ui/index';
import { Syntax } from './syntax';

@Component({
    selector: 'app-example',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [Syntax, NgComponentOutlet, UICard, UIButton],
    template: `<ui-card variant="outlined" data-code-editor>
        <div
            style="display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    border-bottom: solid 1px var(--stroke-neutral-low-contrast);
                    padding: var(--spacing-sizing-04);
                    position: relative;
                    background-color: var(--background-shade);">
            <ng-container [ngComponentOutlet]="component()" [ngComponentOutletInputs]="inputs() || {}"></ng-container>
        </div>
        @if (source() && showCode()) {
            <div data-editor>
                <app-syntax
                    [hideCopy]="true"
                    [source]="source()"
                    language="html"
                    style="margin-top: 2rem;"
                    [pretty]="true"></app-syntax>
            </div>
        }
        @if (source()) {
            <div data-code-options>
                <ui-button
                    [label]="showCode() ? 'Collapse code' : 'Expand code'"
                    (click)="showCode.set(!showCode())"
                    size="x-small"
                    style="border-radius: var(--radius-full)"
                    variant="secondary" />
                <ui-button
                    [icon]="IconContentCopy"
                    [iconOnly]="true"
                    [label]="copyLabel()"
                    (onClick)="copyCode()"
                    size="small"
                    variant="tertiary" />
            </div>
        }
    </ui-card>`,
    host: { style: 'display: contents' },
})
export class AppExample {
    IconContentCopy = IconContentCopy;
    IconRefresh = IconRefresh;

    selector = input<string>('');

    template = input<string>('');

    component = input<Type<any> | null>(null);

    inputs = input<Record<string, any> | null>(null);

    showCode = signal<boolean>(false);

    copyLabel = signal<string>('Copy');

    source = computed(() => {
        if (this.template()) return this.template();

        if (this.inputs()) {
            if (!this.selector()) {
                // eslint-disable-next-line no-console
                console.warn('Selector is required to generate code from inputs');
                return '';
            }

            return generateCode(this.selector(), this.inputs()!);
        }

        return '';
    });

    copyCode() {
        if (!navigator?.clipboard?.writeText) return;

        navigator.clipboard.writeText(this.template());
        this.copyLabel.set('Copied');
        setTimeout(() => this.copyLabel.set('Copy'), 2000);
    }
}

function generateCode(selector: string, inputs: Record<string, any>): string {
    const isNotString = (value: any) => {
        if (typeof value === 'boolean' || ['true', 'false'].includes(value)) return true;

        if (typeof value === 'number' || !isNaN(Number(value))) return true;

        if (Array.isArray(value) || (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')))
            return true;

        if (typeof value === 'object' || (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')))
            return true;

        if (typeof value === 'function' || (typeof value === 'string' && value.includes('=>'))) return true;

        return false;
    };

    const comments: string[] = [];

    const code = `<${selector} ${Object.entries(inputs)
        .map(([key, value]) => {
            if (typeof value === 'function') {
                comments.push(
                    `The "${key}" function would be defined in the class as:\n${value.toString().replace(/\n\s*/g, ' ')}.`,
                );
                return `[${key}]="${value.name}"`;
            }

            return `${isNotString(value) ? `[${key}]` : key}="${value}"`;
        })
        .join(' ')} />`;

    return `${code} ${comments.length ? `\n\n<!-- \n${comments.map((c) => `- ${c}`).join('\n')}\n-->` : ''}`;
}
