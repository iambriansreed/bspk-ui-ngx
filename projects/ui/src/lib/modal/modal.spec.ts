import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Modal', () => {
    let component: Modal;
    let fixture: ComponentFixture<Modal>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Modal],
        }).compileComponents();

        fixture = TestBed.createComponent(Modal);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
