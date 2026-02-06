import { Directive, input, AfterViewInit, inject, ElementRef, OnDestroy } from '@angular/core';
import { AsSignal } from '../../types/common';
import { OutsideClickUtility, OutsideClickUtilityProps } from './outside-click';

interface OutsideClickProps {
    props: OutsideClickUtilityProps;
}

/**
 * A directive to detect clicks outside a specified element and execute a callback.
 *
 * @name OutsideClick
 * @phase Utility
 */
@Directive({
    selector: '[ui-outside-click]',
})
export class UIOutsideClickDirective implements AfterViewInit, OnDestroy, AsSignal<OutsideClickProps> {
    host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

    readonly props = input<OutsideClickProps['props']>(
        {
            disabled: false,
            handleTabs: true,
            callback: () => {
                // no op
            },
        },
        { alias: 'ui-outside-click' },
    );

    private utility = new OutsideClickUtility();

    ngAfterViewInit(): void {
        const nextProps = {
            elements: [this.host!.nativeElement],
            ...this.props(),
        };

        this.utility.init(nextProps);
    }

    ngOnDestroy(): void {
        this.utility.destroy();
    }
}
