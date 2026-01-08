import { signal } from '@angular/core';
import { UtilityBase } from '../types/common';

export interface OutsideClickUtilityProps {
    /** The elements to monitor for outside clicks. */
    elements: HTMLElement[];
    /** The callback function to execute on outside click. */
    callback: (event?: KeyboardEvent | MouseEvent) => void;
    /**
     * Whether the outside click detection is disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether to handle 'Tab' key presses as outside clicks.
     *
     * @default false
     */
    handleTabs?: boolean;
}

/** Utility to detect clicks outside specified elements and execute a callback. */
export class OutsideClickUtility implements UtilityBase<OutsideClickUtilityProps> {
    readonly props = signal<OutsideClickUtilityProps>({
        elements: [],
        callback: () => {
            /* no-op */
        },
        disabled: false,
        handleTabs: false,
    });

    updateProps(next: Partial<OutsideClickUtilityProps>) {
        this.props.set({
            ...this.props(),
            ...next,
        });
    }

    init(props: OutsideClickUtilityProps) {
        if (typeof document === 'undefined') return;

        this.updateProps(props);

        if (this.props().elements?.length) {
            document.addEventListener('mousedown', this.handleClickOutside);
            document.addEventListener('keydown', this.handleOutsideTab);
        }
    }

    destroy() {
        if (typeof document === 'undefined') return;
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleOutsideTab);
    }

    private handleClickOutside = (event: MouseEvent) => {
        const { elements, callback, disabled } = this.props();
        if (disabled || elements?.some?.((element) => element?.contains?.(event.target as Node))) return;
        callback?.(event);
    };

    private handleOutsideTab = (event: KeyboardEvent) => {
        const { elements, callback, disabled, handleTabs } = this.props();

        if (!handleTabs || event.key !== 'Tab' || disabled) return;

        setTimeout(() => {
            if (elements?.some?.((element) => element?.contains?.(document.activeElement))) return;
            callback?.(event);
        }, 0);
    };
}
