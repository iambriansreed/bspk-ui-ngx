import { CommonModule } from '@angular/common';
import {
    Component,
    model,
    AfterViewInit,
    OnDestroy,
    ElementRef,
    viewChild,
    inject,
    EnvironmentInjector,
    Renderer2,
} from '@angular/core';
import { UIButton } from '../button/button';
import { TooltipUtility } from './tooltip';
import { TooltipPlacement, UITooltipDirective } from './tooltip.directive';

@Component({
    selector: 'ui-tooltip-example',
    standalone: true,
    imports: [CommonModule, UITooltipDirective, UIButton],
    template: `
        <div ngx-example>
            <ui-button
                label="Hover me"
                tooltip="Hover me, I explain what this button does"
                tooltipId="button"></ui-button>
        </div>
        <p>This is a button with a tooltip but not using the ui-tooltip directive directly.</p>

        @for (placement of placements; track $index) {
            <h4>{{ placement | titlecase }}</h4>
            <span role="note" [ui-tooltip]="{ label: placement + ' side tooltip', placement: placement }"
                >Hover me ({{ placement }})</span
            >
        }

        <h4>Truncated Only</h4>
        <p>
            This tooltip only appears when the content is truncated. Resize the window to see the effect. When the text
            is fully visible, no tooltip will appear.
        </p>
        <div style="width: 200px; border: 1px solid #ccc; padding: 8px; margin-bottom: 16px;">
            <span role="note" style="width: 100%" [ui-tooltip]="{ truncated: true }"
                >This is some really long text that might be truncated when displayed in a small container.</span
            >
            <br />
            <br />
            <span role="note" style="width: 100%" [ui-tooltip]="{ truncated: true }">This is some text.</span>
        </div>

        <h4>Dynamic Placement</h4>
        <div style="text-align: right;">
            <span
                role="note"
                [ui-tooltip]="{
                    label: 'I change placement based on available space',
                    placement: 'right',
                }">
                Hover me (placement: 'right)
            </span>
        </div>
        <p>Placement is 'right' but the tooltip will adjusts as there is not enough space to the right.</p>

        <h4>No tail</h4>
        <span
            role="note"
            [ui-tooltip]="{
                label: 'No tail',
                showTail: false,
            }"
            >Hover me (no tail)</span
        >

        <h4>Disabled</h4>
        <span
            role="note"
            [ui-tooltip]="{
                label: 'Disabled tooltip',
                disabled: true,
            }"
            >Hover me (disabled)</span
        >

        <h4>Updated Live</h4>
        <p>This demonstrates that the tooltip responds to dynamic updates.</p>
        <span
            role="note"
            [ui-tooltip]="{
                label: 'Updated tooltip (' + counter() + ')',
            }"
            >Hover me ({{ counter() }})</span
        >

        <h4>Reference and Tooltip removed from DOM</h4>
        <p>
            This demonstrates that when the reference element is removed from the DOM, the tooltip is also removed from
            the DOM.
        </p>
        @if (counter() % 10 < 5) {
            <span role="note" [ui-tooltip]="'Hello There'"
                >I will disappear in {{ 5 - (counter() % 10) }} second{{ 5 - (counter() % 10) === 1 ? '' : 's' }}</span
            >
        } @else {
            <span>Will return in {{ 10 - (counter() % 10) }} second{{ 10 - (counter() % 10) === 1 ? '' : 's' }}</span>
        }

        <h4>Tooltip Utility Component</h4>
        <span #tooltipUtil>Hello there</span>
    `,
    styles: `
        span[aria-labelledby] {
            border: 1px dashed #666;
        }
    `,
    host: {
        // ensure the example tooltips are not cut off
        style: `overflow: hidden;`,
    },
})
export class UITooltipExample implements AfterViewInit, OnDestroy {
    placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

    readonly counter = model(0);

    interval: ReturnType<typeof setInterval> | undefined;

    readonly tooltipUtil = viewChild('tooltipUtil', { read: ElementRef });

    tooltip?: TooltipUtility;

    renderer = inject(Renderer2);
    env = inject(EnvironmentInjector);

    ngAfterViewInit() {
        this.interval = setInterval(() => {
            this.counter.set(this.counter() + 1);
        }, 1000);

        this.tooltip = new TooltipUtility(this.renderer, this.env, {
            label: 'Tooltip Utility says hello!',
            placement: 'top',
            reference: this.tooltipUtil()?.nativeElement,
        });
    }

    ngOnDestroy() {
        // make sure to clear interval on destroy
        if (this.interval) clearInterval(this.interval);
    }
}
