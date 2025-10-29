import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavComponent } from './components/app-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNavComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('demo');
}
/**
 * 
  <div style="margin-top: 20px">
    <ui-button label="Open Modal" (click)="open = true"></ui-button>

    <ui-modal [open]="open" (onClose)="open = false" header="Example modal" description="This is a demo modal">
      <p>Modal content — Add any content here.</p>
    </ui-modal>
    
    <div style="margin-top: 12px">
      <ui-button label="Open Drawer" (click)="drawerOpen = true"></ui-button>

      <ui-drawer [open]="drawerOpen" (onClose)="drawerOpen = false" placement="right" [modal]="true" [closeButton]="true" header="Example Drawer">
        <div style="padding: 20px; width: 320px;">
          <p>This is demo drawer content.</p>
        </div>
      </ui-drawer>
    </div>

    <div style="margin-top: 12px">
      <ui-button label="Open Dialog" (click)="open = true"></ui-button>

      <ui-dialog [open]="open" (onClose)="open = false">
        <div style="padding: 20px;">
        <p>This is demo dialog content.</p>
        <ui-button label="Close" (click)="open = false"></ui-button>
        </div>
      </ui-dialog>
    </div>
  </div>
 */
