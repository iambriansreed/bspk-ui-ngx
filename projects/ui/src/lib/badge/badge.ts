import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
    ViewEncapsulation,
} from '@angular/core';

export type BadgeProps = {
    count?: number;
    size?: string;
    color?: string;
    surfaceBorder?: boolean;
};

@Component({
    selector: 'ui-badge',
    standalone: true,
    templateUrl: './badge.html',
    styleUrls: ['./badge.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Badge implements AfterViewInit {
    @Input() count: number | undefined = 1;
    @Input() size: 'small' | 'x-small' = 'small';
    @Input() color: 'primary' | 'secondary' = 'primary';
    @Input() surfaceBorder: boolean = false;

    hasProjectedContent = false;

    @ViewChild('contentWrapper', { static: false }) contentWrapper!: ElementRef<HTMLSpanElement>;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        const nodes = this.contentWrapper.nativeElement.childNodes;
        this.hasProjectedContent = Array.from(nodes).some(
            (node) =>
                node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
        );
        this.cdr.detectChanges();
    }
}
