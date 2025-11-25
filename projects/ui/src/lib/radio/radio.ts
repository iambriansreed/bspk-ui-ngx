import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * <ui-radio name="example" [value]="'option1'" (checkedChange)="selected = $event ? 'option1' : selected"
 * [disabled]="false" [invalid]="false" [required]="true" aria-label="Option 1"
 *
 * > </ui-radio>
 *
 * @name Radio
 * @phase Utility
 */

@Component({
    selector: 'ui-radio',
    standalone: true,
    imports: [],
    templateUrl: './radio.html',
    styleUrl: './radio.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIRadio {
    /**
     * The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name) of the control.
     *
     * @required
     */
    @Input() name?: string;

    /**
     * The value of the field control.
     *
     * @required
     */
    @Input() value?: string;

    /**
     * The aria-label for the element.
     *
     * This is used to provide an accessible name for the element when a visible label is not present.
     *
     * Ensure this is provided when using the element in isolation to maintain accessibility.
     */
    @Input() ariaLabel?: string;

    /**
     * Marks the radio as checked.
     *
     * @default false
     */
    @Input() checked = false;

    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    @Input() disabled?: boolean;

    /** The id of the element. If not provided one will be generated. */
    @Input() id?: string;

    /**
     * Indicates that the element is in an invalid state and displays the error theme.
     *
     * If set to true, an accompanying error message should be provided.
     *
     * @default false
     */
    @Input() invalid?: boolean;

    /**
     * Determines if the element is [required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required).
     *
     * @default false
     */
    @Input() required?: boolean;

    /**
     * The function to call when the radio is checked.
     *
     * @required
     */
    @Output() change = new EventEmitter<Event>();

    /** Emits the new checked state (true or false) */
    @Output() checkedChange = new EventEmitter<boolean>();

    onInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.checkedChange.emit(input.checked);
        this.change.emit(event);
    }
}
