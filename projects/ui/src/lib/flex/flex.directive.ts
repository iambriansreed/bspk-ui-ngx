import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Apply flexbox layout to an element.
 *
 * Usage examples: <div uiFlex></div> <div [uiFlex]="'inline'" direction="column" justify="between" align="center"
 * wrap="wrap" gap="8px"></div>
 */
@Directive({
    selector: '[ui-flex]',
    standalone: true,
})
export class UIFlexDirective implements OnChanges {
    /** Flex-direction */
    @Input() direction: 'column-reverse' | 'column' | 'row-reverse' | 'row' = 'row';

    /** Justify-content Accepts CSS values or shorthands: start,end,center,between,around,evenly */
    @Input() justify:
        | 'around'
        | 'between'
        | 'center'
        | 'end'
        | 'evenly'
        | 'flex-end'
        | 'flex-start'
        | 'space-around'
        | 'space-between'
        | 'space-evenly'
        | 'start' = 'flex-start';

    /** Align-items Accepts CSS values or shorthands: start,end,center,stretch,baseline */
    @Input() align: 'baseline' | 'center' | 'end' | 'flex-end' | 'flex-start' | 'start' | 'stretch' = 'stretch';

    /** Flex-wrap */
    @Input() wrap: 'nowrap' | 'wrap-reverse' | 'wrap' = 'nowrap';

    /** Gap (e.g., 8px, 1rem, var(--space-2)) */
    @Input() gap?: string;

    constructor(private elementRef: ElementRef) {}

    ngOnChanges(): void {
        Object.assign(this.elementRef.nativeElement.style, {
            display: 'flex',
            flexDirection: this.direction,
            justifyContent: this.normalizeJustify(this.justify),
            alignItems: this.normalizeAlign(this.align),
            flexWrap: this.wrap,
            gap: this.gap ?? null,
        });
    }

    private normalizeJustify(v: UIFlexDirective['justify']): string {
        switch (v) {
            case 'start':
                return 'flex-start';
            case 'end':
                return 'flex-end';
            case 'between':
                return 'space-between';
            case 'around':
                return 'space-around';
            case 'evenly':
                return 'space-evenly';
            default:
                return v;
        }
    }

    private normalizeAlign(v: UIFlexDirective['align']): string {
        switch (v) {
            case 'start':
                return 'flex-start';
            case 'end':
                return 'flex-end';
            default:
                return v;
        }
    }
}
