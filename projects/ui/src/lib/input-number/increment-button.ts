import { Component, EventEmitter, Output, ViewEncapsulation, input } from '@angular/core';
import { UIIcon } from '../icon';
import { IconAdd, IconRemove } from '../icons';

@Component({
    selector: 'ui-increment-button',
    imports: [UIIcon],
    template: `<button
        tabindex="-1"
        [attr.aria-label]="label"
        data-bspk="input-number--increment-button"
        (click)="onClick.emit($event)"
        [disabled]="disabledState">
        <ui-icon [icon]="icon"></ui-icon>
    </button>`,
    styleUrl: './input-number.scss',
    host: {
        style: 'display: contents',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIIncrementButton {
    /** Event emitted when the button is clicked. */
    @Output() onClick = new EventEmitter<MouseEvent>();
    /**
     * Whether the button is disabled.
     *
     * @default false
     */
    readonly disabled = input<boolean | undefined>(false);
    /** He kind of increment button, either 'add' or 'remove'. */
    readonly kind = input.required<'add' | 'remove'>();

    get disabledState() {
        return this.disabled() || false;
    }

    get label() {
        return this.kind() === 'add' ? 'Increase value' : 'Decrease value';
    }

    get icon() {
        return this.kind() === 'add' ? IconAdd : IconRemove;
    }
}
