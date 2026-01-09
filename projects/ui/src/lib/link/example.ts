import { Component } from '@angular/core';
import { UITxtDirective } from '../txt';
import { LinkProps, UILinkDirective } from './link.directive';

@Component({
    selector: 'ui-link-example',
    standalone: true,
    imports: [UILinkDirective, UITxtDirective],
    template: `
        <h2>Link</h2>

        <h3>Sizes</h3>
        <p>
            <a ui-link href="#" size="small">Small Link</a>
        </p>
        <p>
            <a ui-link href="#" size="base">Base Link</a>
        </p>
        <p>
            <a ui-link href="#" size="large">Large Link</a>
        </p>

        <h3>With External Icon</h3>
        <a ui-link href="https://anywhere.re" trailingIcon="external">External Link</a>

        <h3>With Chevron Icon</h3>
        <a ui-link href="#" trailingIcon="chevron">Chevron Link</a>

        <h3>With Link Icon</h3>
        <a ui-link href="#" trailingIcon="link">Link Icon</a>

        <h3>Variants</h3>
        <div data-links-grid>
            <div></div>
            <span ui-txt="labels-large">Default</span>
            <span ui-txt="labels-large">Hover</span>
            <span ui-txt="labels-large">Active</span>
            <span ui-txt="labels-large">Disabled</span>
            <span ui-txt="labels-large">Visited</span>
            <span ui-txt="labels-large">Focus</span>
            @for (kind of this.kinds; track kind) {
                <div ui-txt="labels-large">{{ kind }}</div>
                @for (state of ['default', 'hover', 'active', 'disabled', 'visited', 'focus']; track state) {
                    <div [attr.data-kind]="kind">
                        @if (state === 'disabled') {
                            <a
                                ui-link
                                href="https://bspk.dev/fake-link/{{ kind }}+{{ state }}"
                                [variant]="kind"
                                [disabled]="true"
                                >Link</a
                            >
                        } @else {
                            <a
                                ui-link
                                href="https://bspk.dev/fake-link/{{ kind }}+{{ state }}"
                                [variant]="kind"
                                [attr.data-pseudo]="state !== 'default' ? state : null">
                                Link
                            </a>
                        }
                    </div>
                }
            }
        </div>

        <h3>Without directive</h3>
        <a href="https://bspk.dev">Default Link</a>
        <p>
            Anchor tags without the <code>ui-link</code> directive will have the link styles applied if the body has the
            <code>data-bspk</code> attribute and the anchor itself does not have the <code>data-bspk</code> attribute.
        </p>
    `,
})
export class UILinkExample {
    kinds: Exclude<LinkProps['variant'], undefined>[] = ['default', 'subtle', 'subtle-inverse'];
}
