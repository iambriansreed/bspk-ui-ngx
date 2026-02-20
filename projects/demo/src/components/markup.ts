import { Component, input } from '@angular/core';
import { marked } from 'marked';

@Component({
    selector: 'app-markup',
    imports: [],
    template: ``,
    host: {
        '[innerHTML]': 'source() ? marked(source()!) : ""',
    },
})
export class AppMarkup {
    source = input<string>();

    marked = marked;
}
