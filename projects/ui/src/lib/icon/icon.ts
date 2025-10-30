import { Component, effect, ElementRef, input, ViewEncapsulation, inject } from '@angular/core';

import { IconRegistry } from './icon-registry.service';

@Component({
  selector: 'bspk-icon',
  imports: [],
  template: '',
  styleUrl: './icon.scss',
  host: {
    'data-bspk': 'icon',
    role: 'img',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Icon {
  /**
   * @see https://bspk.anywhere.re/icons
   */
  readonly name = input.required<string>();

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
    });
  }
}
