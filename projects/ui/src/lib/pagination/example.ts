import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIPagination } from './pagination';

@Component({
    selector: 'ui-pagination-example',
    standalone: true,
    imports: [CommonModule, UIPagination],
    template: `
        <p>See working example on the table page: <a href="/table">Table</a></p>

        <h4>Pagination with Input</h4>
        <ui-pagination [value]="values()[0]" [numPages]="50" (valueChange)="valueChange(0, $event)" />

        <h4>Pagination with Buttons</h4>
        <ui-pagination [value]="values()[1]" [numPages]="7" (valueChange)="valueChange(1, $event)" />

        <h4>Hidden when only one page</h4>
        <ui-pagination [value]="values()[2]" [numPages]="1" (valueChange)="valueChange(2, $event)" />
        <p>This pagination component is hidden because there is only one page.</p>
    `,
})
export class UIPaginationExample {
    protected readonly values = model([1, 5, 1]);

    protected valueChange(exampleIndex: number, num: number) {
        sendSnackbar(`Pagination changed to page ${num}`);
        const values = this.values();
        values[exampleIndex] = num;
        this.values.set(values);

        // No operation for example
    }
}
