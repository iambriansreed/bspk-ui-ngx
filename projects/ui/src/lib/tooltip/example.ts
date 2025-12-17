import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UITooltipDirective } from './tooltip.directive';

@Component({
    selector: 'ui-tooltip-example',
    standalone: true,
    imports: [CommonModule, UITooltipDirective],
    template: `
        <h2>Tooltip Directive</h2>

        <p>
            <span [ui-tooltip]="{ label: 'Told ya!', showTail: true, placement: 'bottom' }">Hover me for tooltip!</span>
        </p>

        <p [ui-tooltip]="{ label: '', showTail: true, placement: 'bottom' }">
            Empty tooltip label (no tooltip should show)
        </p>

        <p [ui-tooltip]="{ label: undefined, showTail: true, placement: 'bottom' }">
            Undefined tooltip label (no tooltip should show)
        </p>
    `,
})
export class UITooltipExample {}
