import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Chip, ChipProps } from '../chip/chip';

export type Overflow = 'wrap' | 'scroll';

@Component({
    selector: 'ui-chip-group',
    standalone: true,
    imports: [Chip],
    templateUrl: './chip-group.html',
    styleUrl: './chip-group.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ChipGroup {
    /** To allow chips to scroll. If set to false chips will wrap. */
    @Input() overflow: Overflow = 'wrap';

    /** Only Chip components should be used as children. */
    @Input() items?: ChipProps[];
}
