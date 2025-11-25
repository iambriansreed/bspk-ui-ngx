import { Component, Input, ViewEncapsulation } from '@angular/core';

export type ColorVariant =
    | 'primary'
    | 'secondary'
    | 'grey'
    | 'white'
    | 'blue'
    | 'green'
    | 'lime'
    | 'magenta'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow';

@Component({
    selector: 'ui-tag',
    standalone: true,
    imports: [],
    templateUrl: './tag.html',
    styleUrls: ['./tag.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UITag {
    /**
     * The label of the tag.
     *
     * @required
     */
    @Input() label!: string;

    /**
     * The size of the tag.
     *
     * @default small
     */
    @Input() size: 'small' | 'x-small' = 'small';

    /**
     * The color of the tag.
     *
     * @default grey
     */
    @Input() color: ColorVariant = 'grey';

    /**
     * The display variant of the tag.
     *
     * @default flat
     */
    @Input() variant: 'corner-wrap' | 'flat' | 'pill' = 'flat';
}
