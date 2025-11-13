import { Component, Input } from '@angular/core';
import { Chip } from '../chip/chip';

export type ChipGroupItem = {
    label: string;
    disabled?: boolean;
    flat?: boolean;
    selected?: boolean;
    leadingIcon?: string;
    trailingIcon?: string;
    trailingBadge?: any;
    onClick?: (event: Event) => void;
};

@Component({
    selector: 'ui-chip-group',
    standalone: true,
    imports: [Chip],
    templateUrl: './chip-group.html',
    styleUrl: './chip-group.scss',
})
export class ChipGroup {
    /** To allow chips to wrap. If set to false chips will scroll. */
    @Input() wrap: boolean = true;

    /** Only Chip components should be used as children. */
    @Input() items?: ChipGroupItem[];
}
