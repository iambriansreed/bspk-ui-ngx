import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UISwitchOption } from '../..';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UICalendar } from './calendar';

@Component({
    selector: 'ui-calendar-example',
    standalone: true,
    imports: [CommonModule, UICalendar, UISwitchOption],
    template: `
        <h4>Default</h4>
        <ui-calendar (valueChange)="handleChange($event)" />

        <h4>With Initial Value</h4>
        <ui-calendar [value]="initialDate()" (valueChange)="initialDate.set($event!)" />

        <h4>With Focus Trap</h4>
        <p>
            Focus is trapped within the calendar when it opens. This is especially useful when the calendar is used
            within a popover like in the DatePicker component.
        </p>
        <ui-switch-option
            value="enabled"
            name="enableFocusTrap"
            [checked]="focusTrapEnabled()"
            (checkedChange)="focusTrapEnabled.set(!!$event)"
            label="Enable Focus Trap" />

        <ui-calendar [focusTrap]="focusTrapEnabled()" (valueChange)="handleChange($event, 'With Focus Trap')" />

        <h4>With Custom ID</h4>
        <ui-calendar id="custom-calendar" (valueChange)="handleChange($event, 'With Custom ID')" />
    `,
})
export class UICalendarExample {
    // Signal for focus trap toggle
    readonly focusTrapEnabled = signal(false);

    // Signal for initial value example
    readonly initialDate = signal(new Date(1985, 6, 3)); // July 3, 1985

    handleChange(date: Date | undefined, label = 'Default') {
        if (date) sendSnackbar(`valueChange (${label}): ${date.toDateString()}`);
        else sendSnackbar(`valueChange (${label}): undefined`);
    }
}
