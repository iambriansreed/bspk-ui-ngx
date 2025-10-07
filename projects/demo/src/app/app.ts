import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '../../../../projects/ui/src/lib/button/button';
import { Card } from '../../../../projects/ui/src/lib/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo');
}
