import { Component, effect, ElementRef, input, ViewEncapsulation, inject, Input } from '@angular/core';

import { IconRegistry } from './icon-registry.service';

@Component({
    selector: 'ui-icon',
    imports: [],
    template: '',
    styles: 'ui-icon { display: contents; }',
    encapsulation: ViewEncapsulation.None,
})
export class Icon {
    /** @see https://bspk.anywhere.re/icons */
    readonly name = input.required<string>();
    @Input() width?: string = '24px';

    constructor() {
        const elementRef = inject(ElementRef);
        const iconRegistry = inject(IconRegistry);

        effect(async (onCleanup) => {
            let canceled = false;
            onCleanup(() => {
                canceled = true;
            });
            const res = await iconRegistry.getIcon(this.name());
            if (!canceled) {
                elementRef.nativeElement.innerHTML = res;
            }
            elementRef.nativeElement.children[0]?.setAttribute('style', 'width: ' + this.width);
        });
    }
}
