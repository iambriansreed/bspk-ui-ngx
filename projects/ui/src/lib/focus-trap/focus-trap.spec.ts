import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIFocusTrapDirective } from './focus-trap.directive';

/**
 * - Should trap focus within the focus trap when enabled
 * - Should allow focus to leave the focus trap when disabled
 */
@Component({
    standalone: true,
    imports: [UIFocusTrapDirective],
    template: `<div>
        <div [ui-focus-trap]="true" id="focus-trap">
            Hello Focus Trap
            <button>Click Me</button>
            <a href="#">Link</a>
        </div>
        <button id="outside-button">Outside Button</button>
    </div> `,
})
class HostCmp {}

const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });

describe('UIFocusTrapDirective', () => {
    let fixture: ComponentFixture<HostCmp>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostCmp],
        }).compileComponents();

        fixture = TestBed.createComponent(HostCmp);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should trap focus within the focus trap when enabled', () => {
        const focusTrapEl: HTMLElement = fixture.nativeElement.querySelector('#focus-trap');
        const buttons = focusTrapEl.querySelectorAll<HTMLElement>('button, a');
        const firstButton = buttons[0];
        const lastButton = buttons[1];

        // Focus the first button
        firstButton.focus();
        expect(document.activeElement).toBe(firstButton);

        // Simulate Tab key press to move focus to the next element (must bubble to the host to trigger the directive)
        firstButton.dispatchEvent(tabEvent);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(document.activeElement).toBe(lastButton);
            // Simulate Tab key press on the last button to cycle back to the first
            lastButton.dispatchEvent(tabEvent);
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(document.activeElement).toBe(firstButton);
            });
        });
    });

    it('should allow focus to leave the focus trap when disabled', () => {
        const focusTrapEl: HTMLElement = fixture.nativeElement.querySelector('#focus-trap');
        const buttons = focusTrapEl.querySelectorAll<HTMLElement>('button, a');
        const lastButton = buttons[buttons.length - 1];
        const outsideButton: HTMLElement = fixture.nativeElement.querySelector('#outside-button');

        // Disable the focus trap
        (fixture.componentInstance as any)['ui-focus-trap'] = false;
        fixture.detectChanges();

        // Focus the last button
        lastButton.focus();
        expect(document.activeElement).toBe(lastButton);

        // Simulate Tab key press to move focus out of the focus trap
        lastButton.dispatchEvent(tabEvent);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            // Focus should move to the outside button
            expect(document.activeElement).toBe(outsideButton);
        });
    });
});
