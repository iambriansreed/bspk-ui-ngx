import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
    providedIn: 'root', // Makes the service a singleton available application-wide
})
export class OutsideClick implements OnDestroy {
    private elements: HTMLElement[] | undefined;
    private callback: ((event?: KeyboardEvent | MouseEvent) => void) | undefined;
    private disabled = false;
    private handleTabs = false;

    constructor() {
        // this.callback = props.callback;
        // this.disabled = props.disabled || false;
        // this.handleTabs = props.handleTabs || false;
        // this.elements = props.elements || null;
    }

    onInit(
        elements: HTMLElement[],
        callback: (event?: KeyboardEvent | MouseEvent) => void,
        disabled = false,
        handleTabs = false,
    ) {
        this.elements = elements;
        this.callback = callback;
        this.disabled = disabled;
        this.handleTabs = handleTabs;

        if (typeof document === 'undefined' || !elements.length) return;

        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('keydown', this.handleOutsideTab);
    }

    ngOnDestroy() {
        if (typeof document === 'undefined') return;

        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleOutsideTab);
    }

    private handleClickOutside = (event: MouseEvent) => {
        const { elements, callback, disabled } = this;

        if (disabled || elements?.some?.((element) => element?.contains?.(event.target as Node))) return;

        callback?.(event);
    };

    private handleOutsideTab = (event: KeyboardEvent) => {
        const { elements, callback, disabled, handleTabs } = this;
        if (!handleTabs || event.key !== 'Tab' || disabled) return;

        setTimeout(() => {
            if (elements?.some?.((element) => element?.contains?.(document.activeElement))) return;
            callback?.(event);
        }, 0);
    };
}
