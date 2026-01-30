import { Directive, input, AfterViewInit, inject, ElementRef, OnDestroy } from '@angular/core';
import { AsSignal } from '../../types/common';
import { KeyNavigationUtility, KeyNavigationUtilityProps } from './key-navigation';

export interface KeyNavigationProps {
    props: KeyNavigationUtilityProps;
}

/**
 * A directive to enable key navigation on an element.
 *
 * @name UIKeyNavigationDirective
 * @phase Utility
 */
@Directive({
    selector: '[ui-key-navigation]',
    host: {
        '(keydown)': 'handleKeydown($event)',
    },
})
export class UIKeyNavigationDirective implements AfterViewInit, OnDestroy, AsSignal<KeyNavigationProps> {
    host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

    readonly props = input<KeyNavigationProps['props']>(
        {
            activeElementId: null,
        },
        { alias: 'ui-key-navigation' },
    );

    private keyNavigation = new KeyNavigationUtility();

    handleKeydown(event: KeyboardEvent) {
        this.keyNavigation.handleKeydown(event);
    }

    ngAfterViewInit(): void {
        this.keyNavigation.init(this.props());
    }

    ngOnDestroy(): void {
        this.keyNavigation.destroy();
    }
}
