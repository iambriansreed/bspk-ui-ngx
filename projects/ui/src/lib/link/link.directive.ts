import { Directive, ElementRef, Renderer2, inject, input, effect, ViewContainerRef, DestroyRef } from '@angular/core';
import { AsSignal } from '../../types/common';

export interface LinkProps {
    /** The variant of the link. Controls the icon that is displayed and link target. */
    trailingIcon?: 'chevron' | 'external' | 'link';
    /**
     * The href of the link.
     *
     * @example
     *     https://bspk.dev
     */
    href: string | null | undefined;
    /**
     * The size of the link.
     *
     * @default base
     */
    size?: 'base' | 'large' | 'small';
    /**
     * Change the color of the link to a subtle color. This is useful for links that are not primary actions, for
     * example footer menus.
     *
     * @default default
     */
    variant?: 'default' | 'subtle-inverse' | 'subtle';
    /**
     * The target of the link. If the `trailingIcon` is set to `external`, this will default to `_blank`.
     *
     * @default _self
     */
    target?: '_blank' | '_parent' | '_self' | '_top';
    /** Determines if the element is disabled. */
    disabled?: boolean;
}

/**
 * This is the standalone link directive. Apply to an `a` element.
 *
 * @example
 *     <a ui-link href="https://anywhere.re" [label]="'Example label'" trailingIcon="external"></a>
 *
 * @name Link
 * @phase Stable
 */
@Directive({
    selector: 'a[ui-link]',
})
export class UILinkDirective implements AsSignal<LinkProps> {
    readonly trailingIcon = input<LinkProps['trailingIcon']>();
    readonly href = input<LinkProps['href']>();
    readonly size = input<LinkProps['size']>('base');
    readonly variant = input<LinkProps['variant']>('default');
    readonly target = input<LinkProps['target']>('_self');
    readonly disabled = input<LinkProps['disabled']>(false);

    private readonly host = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
    private readonly renderer = inject(Renderer2);
    private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
    private destroyRef = inject(DestroyRef);

    private labelSpan: HTMLSpanElement | null = null;

    constructor() {
        effect(async () => {
            const el = this.host.nativeElement;
            const iconComponent = await this.iconComponent();

            // only add icon if component is not destroyed since this is async
            if (iconComponent && !this.destroyRef.destroyed) {
                const icon = this.viewContainerRef.createComponent(iconComponent);
                this.renderer.appendChild(el, icon.location.nativeElement);
            }
        });

        effect(() => {
            const el = this.host.nativeElement;

            // Set base attributes
            this.renderer.setAttribute(el, 'data-bspk', 'link');
            this.renderer.setAttribute(el, 'data-size', this.size() || 'base');
            this.renderer.setAttribute(el, 'data-trailing-icon', this.trailingIcon() || '');

            // Subtle variants
            const v = this.variant();
            if (v === 'subtle') {
                this.renderer.setAttribute(el, 'data-subtle', 'true');
                this.renderer.removeAttribute(el, 'data-subtle-inverse');
            } else if (v === 'subtle-inverse') {
                this.renderer.setAttribute(el, 'data-subtle-inverse', 'true');
                this.renderer.removeAttribute(el, 'data-subtle');
            } else {
                this.renderer.removeAttribute(el, 'data-subtle');
                this.renderer.removeAttribute(el, 'data-subtle-inverse');
            }

            // href, disabled, target
            const hrefVal = this.href();
            if (hrefVal) this.renderer.setAttribute(el, 'href', hrefVal);
            else this.renderer.removeAttribute(el, 'href');

            const disabledVal = this.disabled();
            if (disabledVal) this.renderer.setAttribute(el, 'disabled', 'true');
            else this.renderer.removeAttribute(el, 'disabled');

            const tIcon = this.trailingIcon();
            const tgt = tIcon === 'external' ? '_blank' : this.target() || '_self';
            this.renderer.setAttribute(el, 'target', tgt);

            // wrap text content in span
            if (!this.labelSpan) {
                const span = this.renderer.createElement('span') as HTMLSpanElement;
                span.textContent = el.textContent;
                this.renderer.setProperty(el, 'textContent', '');
                this.renderer.appendChild(el, span);
                this.labelSpan = span;
            }
        });
    }

    iconComponent() {
        const tIcon = this.trailingIcon();
        if (tIcon === 'external') return import('../icons/open-in-new').then((m) => m.IconOpenInNew);
        if (tIcon === 'chevron') return import('../icons/chevron-right').then((m) => m.IconChevronRight);
        if (tIcon === 'link') return import('../icons/link').then((m) => m.IconLink);
        return null;
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
