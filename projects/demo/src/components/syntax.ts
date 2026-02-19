import { Component, ElementRef, input, model, signal, ViewEncapsulation, AfterViewInit, inject } from '@angular/core';
import { PrettyParser } from '@shared/types';
import hljs from 'highlight.js';
import { pretty } from '../../../shared/src/utils/pretty';
import { UICard, UIFab } from '../../../ui/src';

/**
 * A component for displaying syntax-highlighted code snippets, with optional pretty-printing and a copy-to-clipboard
 * feature.
 */
@Component({
    selector: 'app-syntax',
    imports: [UIFab, UICard],
    template: `
        <ui-card variant="outlined">
            <ui-fab
                data-copy-code
                [label]="copyLabel()"
                (onClick)="copyCode()"
                placement="top-right"
                size="medium"
                style="margin-top: -10px; margin-right: -10px"
                variant="neutral" />
            <pre><code [attr.class]="'language-' + language()">{{source()}}</code></pre>
        </ui-card>
    `,
    host: {
        '[attr.data-syntax]': 'true',
    },
    standalone: true,
    encapsulation: ViewEncapsulation.None,
})
export class Syntax implements AfterViewInit {
    source = model<string>('');

    language = input.required<PrettyParser>();

    pretty = input<boolean>(false);

    DEFAULT_COPY_LABEL = 'Copy';

    copyLabel = signal<string>(this.DEFAULT_COPY_LABEL);

    host = inject<ElementRef<HTMLElement>>(ElementRef);

    get preElement() {
        return this.host.nativeElement.querySelector<HTMLElement>('pre:first-of-type') as HTMLElement | null;
    }

    get codeElement() {
        return this.preElement?.querySelector<HTMLElement>('code:first-of-type') as HTMLElement | null;
    }

    ngAfterViewInit() {
        const makePretty =
            this.pretty() ||
            this.language() === 'html' ||
            this.language() === 'typescript' ||
            this.language().endsWith('css') ||
            this.language().endsWith('script');

        if (makePretty) {
            pretty(this.source(), { parser: this.language() }).then((next) => {
                this.source.set(next);

                requestAnimationFrame(() => {
                    hljs.highlightElement(this.codeElement!);
                });
            });
        }
    }

    copyCode() {
        if (!navigator?.clipboard?.writeText) return;

        navigator.clipboard.writeText(this.source());
        this.copyLabel.set('Copied');
        setTimeout(() => this.copyLabel.set(this.DEFAULT_COPY_LABEL), 2000);
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
