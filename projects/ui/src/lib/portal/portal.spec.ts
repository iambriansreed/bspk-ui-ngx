import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIPortalDirective } from './portal.directive';

@Component({
    standalone: true,
    imports: [UIPortalDirective],
    template: ` <span ui-portal id="portaled">Hello Portal</span> `,
})
class HostCmp {}

describe('UIPortalDirective', () => {
    let fixture: ComponentFixture<HostCmp>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostCmp],
        }).compileComponents();

        fixture = TestBed.createComponent(HostCmp);
        fixture.detectChanges();
    });

    it('renders content into document.body by default', () => {
        const node = document.body.querySelector('#portaled');
        expect(node).toBeTruthy();
    });

    it('cleans up on destroy', () => {
        fixture.destroy();
        const node = document.body.querySelector('#portaled');
        expect(node).toBeNull();
    });
});
