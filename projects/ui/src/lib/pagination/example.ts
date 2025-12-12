import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIPagination } from './pagination';

@Component({
    selector: 'ui-pagination-example',
    standalone: true,
    imports: [CommonModule, UIPagination],
    template: `
        <h2>Pagination</h2>

        <p>See working example on the table page: <a href="/table">Table</a></p>

        <h3>Pagination with Input</h3>
        <ui-pagination [value]="1" [numPages]="50"></ui-pagination>

        <h3>Pagination with Buttons</h3>
        <ui-pagination [value]="5" [numPages]="7"></ui-pagination>

        <h3>Hidden when only one page</h3>
        <ui-pagination [value]="1" [numPages]="1"></ui-pagination>
        <p>This pagination component is hidden because there is only one page.</p>
    `,
})
export class UIPaginationExample {}
