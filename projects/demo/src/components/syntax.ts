import {
    Component,
    effect,
    ElementRef,
    input,
    model,
    signal,
    ViewEncapsulation,
    AfterViewInit,
    inject,
} from '@angular/core';
import { PrettyParser } from '@shared/types';
import hljs from 'highlight.js';
import { UIFab } from '../../../ui/src';
import { pretty } from '../utils/pretty';

/**
 * A component for displaying syntax-highlighted code snippets, with optional pretty-printing and a copy-to-clipboard
 * feature.
 */
@Component({
    selector: 'app-syntax',
    imports: [UIFab],
    template: `
        <ui-fab
            data-copy-code
            [label]="copyLabel()"
            (onClick)="copyCode()"
            placement="top-right"
            size="small"
            style="margin-top: -10px; margin-right: -10px"
            variant="neutral" />
        <pre><code>{{source()}}</code></pre>
    `,
    host: {
        'data-syntax': '',
        '[attr.style]': "this.propStyle() || ''",
    },
    standalone: true,
    encapsulation: ViewEncapsulation.None,
})
export class Syntax implements AfterViewInit {
    source = model<string>('');

    language = input.required<PrettyParser>();

    propStyle = input<string>();
    pretty = input<boolean>(false);

    DEFAULT_COPY_LABEL = 'Copy';

    copyLabel = signal<string>(this.DEFAULT_COPY_LABEL);

    host = inject<ElementRef<HTMLElement>>(ElementRef);

    state = signal<{
        mounted: boolean;
        unmounted: boolean;
        prettyPrinted: boolean;
        highlighted: boolean;
    }>({
        mounted: false,
        unmounted: false,
        prettyPrinted: false,
        highlighted: false,
    });

    constructor() {
        effect(() => {
            //  if (this.preElement) this.preElement.dataset['highlighted'] = this.state().highlighted ? 'true' : undefined;
        });

        effect(() => {
            if (this.codeElement) this.codeElement.classList.add(`language-${this.language()}`);
        });

        effect(() => {
            if (!this.state().mounted) return;

            const makePretty =
                this.pretty() ||
                this.language() === 'typescript' ||
                this.language().endsWith('css') ||
                this.language().endsWith('script');

            if (makePretty && !this.state().prettyPrinted) {
                pretty(this.source(), { parser: this.language() })
                    .then((next) => {
                        this.source.set(next);
                        this.state.update((state) => ({ ...state, prettyPrinted: true }));
                    })
                    .then(() => {
                        if (!this.state().highlighted && this.codeElement) {
                            hljs.highlightElement(this.codeElement);
                            this.state.update((state) => ({ ...state, highlighted: true }));
                        }
                    });
            }
        });
    }

    get preElement() {
        return this.host.nativeElement.querySelector<HTMLElement>('pre:first-of-type') as HTMLElement | null;
    }

    get codeElement() {
        return this.preElement?.querySelector<HTMLElement>('code:first-of-type') as HTMLElement | null;
    }

    ngAfterViewInit() {
        this.state.set({ ...this.state(), mounted: true });
    }

    copyCode() {
        if (!navigator?.clipboard?.writeText) return;

        navigator.clipboard.writeText(this.source());
        this.copyLabel.set('Copied');
        setTimeout(() => this.copyLabel.set(this.DEFAULT_COPY_LABEL), 2000);
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
