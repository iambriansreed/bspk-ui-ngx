import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavComponent } from './components/app-nav';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppNavComponent],
    templateUrl: './app.html',
    encapsulation: ViewEncapsulation.None,
})
export class App {
    protected readonly title = signal('demo');
}
