import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';
import { UILinkDirective } from './link.directive';

@Component({
    selector: 'ui-host',
    standalone: true,
    imports: [UILinkDirective],
    template: `<a [ui-link]="'#ok'">Hover me</a>`,
})
class HostComponent {}

describe('UILinkDirective', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
