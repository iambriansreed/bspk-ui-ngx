import { CommonModule } from '@angular/common';
import { Component, model, AfterViewInit } from '@angular/core';
import { UIButton } from '../button/button';
import { TooltipPlacement, UITooltipDirective } from './tooltip.directive';

@Component({
    selector: 'ui-tooltip-example',
    standalone: true,
    imports: [CommonModule, UITooltipDirective, UIButton],
    template: `
        <h2>Tooltip</h2>

        <div ngx-example>
            <ui-button label="Hover me" tooltip="I explain what this button does" tooltipId="button"></ui-button>
        </div>
        <p>This is a button with a tooltip but not using the ui-tooltip directive directly.</p>

        @for (placement of placements; track $index) {
            <h3>{{ placement | titlecase }}</h3>
            <span [ui-tooltip]="{ label: placement + ' side tooltip', placement: placement }"
                >Hover me ({{ placement }})</span
            >
        }

        <h3>Dynamic Placement</h3>
        <div style="text-align: right;">
            <span
                [ui-tooltip]="{
                    label: 'I change placement based on available space',
                    placement: 'right',
                }">
                Hover me (placement: 'right)
            </span>
        </div>
        <p>Placement is 'right' but the tooltip will adjusts as there is not enough space to the right.</p>

        <h3>No tail</h3>
        <span
            [ui-tooltip]="{
                label: 'No tail',
                showTail: false,
            }"
            >Hover me (no tail)</span
        >

        <h3>Disabled</h3>
        <span
            [ui-tooltip]="{
                label: 'Disabled tooltip',
                disabled: true,
            }"
            >Hover me (disabled)</span
        >

        <h3>Updated Live</h3>
        <p>This demonstrates that the tooltip responds to dynamic updates.</p>
        <span
            [ui-tooltip]="{
                label: 'Updated tooltip (' + counter() + ')',
            }"
            >Hover me ({{ counter() }})</span
        >

        <h3>Reference and Tooltip removed from DOM</h3>
        <p>
            This demonstrates that when the reference element is removed from the DOM, the tooltip is also removed from
            the DOM.
        </p>
        @if (counter() % 10 < 5) {
            <span [ui-tooltip]="'Hello There'"
                >I will disappear in {{ 5 - (counter() % 10) }} second{{ 5 - (counter() % 10) === 1 ? '' : 's' }}</span
            >
        } @else {
            <span>Will return in {{ 10 - (counter() % 10) }} second{{ 10 - (counter() % 10) === 1 ? '' : 's' }}</span>
        }
    `,
    host: {
        // ensure the example tooltips are not cut off
        style: `overflow: hidden;`,
    },
})
export class UITooltipExample implements AfterViewInit {
    placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

    readonly counter = model(0);

    ngAfterViewInit() {
        setInterval(() => {
            this.counter.set(this.counter() + 1);
        }, 1000);
    }
}
