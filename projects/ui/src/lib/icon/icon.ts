import { Component, effect, ElementRef, input, ViewEncapsulation, inject, Input } from '@angular/core';

import { IconRegistry } from './icon-registry.service';

@Component({
    selector: 'ui-icon',
    imports: [],
    template: '',
    styles: 'ui-icon { display: contents; }',
    encapsulation: ViewEncapsulation.None,
})
export class UIIcon {
    /** @see https://bspk.anywhere.re/icons */
    name = input.required<string>();
    @Input() width?: string;

    constructor() {
        const elementRef = inject(ElementRef);
        const iconRegistry = inject(IconRegistry);

        effect(async (onCleanup) => {
            let canceled = false;
            onCleanup(() => {
                canceled = true;
            });
            const res = await iconRegistry.getIcon(this.name());
            if (canceled) return;

            elementRef.nativeElement.innerHTML = res;
            if (this.width) elementRef.nativeElement.children[0]?.setAttribute('width', this.width);
        });
    }
}
