import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIButton } from '../button';
import { FloatingUtilityProps } from './floating';
import { UIFloatingDirective } from './floating.directive';

@Component({
    selector: 'ui-floating-example',
    standalone: true,
    imports: [CommonModule, UIFloatingDirective, UIButton],
    template: `
        <h4>Basic Example</h4>

        <div
            style="border: 1px solid var(--stroke-neutral-base); padding: 16px; display: inline-block; display: flex; gap: 8px;">
            <ui-button label="Does nothing" (click)="doNothing()" />
            <ui-button #reference label="Click me" (click)="open.set(!open())" />
            @if (open()) {
                <div
                    [ui-floating]="floatingProps()"
                    style="border: 1px solid var(--stroke-neutral-base); padding: 16px; display: inline-block; background: var(--surface-neutral-t3-low);">
                    <p>This element is using the ui-floating directive.</p>
                </div>
            }
        </div>
    `,
})
export class UIFloatingExample {
    readonly open = signal(false);

    readonly reference = viewChild<UIButton>('reference');

    floatingProps = (): FloatingUtilityProps => {
        return {
            reference: this.reference()?.nativeElement,
        };
    };

    doNothing = () => sendSnackbar('Button clicked, but doing nothing!');
}
