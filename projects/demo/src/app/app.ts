import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Badge } from '../../../../projects/ui/src/lib/badge/badge';
import { Button } from '../../../../projects/ui/src/lib/button/button';
import { Accordion } from '../../../../projects/ui/src/lib/accordion/accordion';
import { Card } from '../../../../projects/ui/src/lib/card/card';
import { IconAdd } from '../../../../projects/ui/src/lib/icons/add';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Badge, Button, Card, IconAdd, Accordion],
  templateUrl: './app.html',
  styleUrls: [
    './app.scss',
    '../../../../projects/ui/src/lib/styles/base.scss',
    '../../../../projects/ui/src/lib/styles/colors.scss',
  ],
})
export class App {
  protected readonly title = signal('demo');
}
