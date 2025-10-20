import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '../../../../projects/ui/src/lib/button/button';
import { Card } from '../../../../projects/ui/src/lib/card/card';
import { TooltipDirective } from '../../../../projects/ui/src/lib/tooltip/tooltip.directive';
import { IconAdd } from '../../../../projects/ui/src/lib/icons/add';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Card, IconAdd, TooltipDirective],
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
