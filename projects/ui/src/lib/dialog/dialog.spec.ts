import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog } from './dialog';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Dialog', () => {
    let component: Dialog;
    let fixture: ComponentFixture<Dialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Dialog],
        }).compileComponents();

        fixture = TestBed.createComponent(Dialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
