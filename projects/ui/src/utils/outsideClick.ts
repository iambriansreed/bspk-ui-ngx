export class OutsideClick {
    private elements: (HTMLElement | null)[] | null = null;
    private callback: ((event?: KeyboardEvent | MouseEvent) => void) | undefined;
    private disabled = false;
    private handleTabs = false;

    constructor(props: {
        elements?: (HTMLElement | null)[] | null;
        callback?: (event?: KeyboardEvent | MouseEvent) => void;
        disabled?: boolean;
        handleTabs?: boolean;
    }) {
        this.callback = props.callback;
        this.disabled = props.disabled || false;
        this.handleTabs = props.handleTabs || false;
        this.elements = props.elements || null;
    }

    setElements(elements: (HTMLElement | null)[] | null) {
        this.elements = elements;
    }

    onInit() {
        if (typeof document === 'undefined') return;

        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('keydown', this.handleOutsideTab);
    }

    onDestroy() {
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
