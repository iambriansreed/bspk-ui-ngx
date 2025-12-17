import {
    Component,
    ViewEncapsulation,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    AfterViewInit,
    inject,
} from '@angular/core';
import { UITooltipDirective, TooltipProps } from '../tooltip/tooltip.directive';

@Component({
    selector: 'ui-truncated',
    imports: [UITooltipDirective],
    styleUrls: ['./truncated.scss'],
    template: `<span data-truncated [ui-tooltip]="tooltip" #el>
        <ng-content></ng-content>
    </span> `,
    encapsulation: ViewEncapsulation.None,
})
export class UITruncated implements AfterViewInit {
    /**
     * The content to render.
     *
     * @example
     *     Some really long text that might be truncated when displayed in a small container.
     *
     * @type string
     * @required
     */
    @ViewChild('el', { static: false }) elRef!: ElementRef<HTMLElement>;

    tooltip: TooltipProps | string = '';

    private cdr = inject(ChangeDetectorRef);

    ngAfterViewInit() {
        const el = this.elRef?.nativeElement;

        if (el && el.scrollWidth > el.clientWidth && this.tooltip === '') {
            this.tooltip = { label: el.textContent?.trim() || '', showTail: true };
            this.cdr.detectChanges();
        }
    }
}
