import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';
import { UIButton } from '../button/button';
import { UIModal } from './modal';

describe('UIModal', () => {
    let fixture: ComponentFixture<UIModal>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIModal, UIButton],
        }).compileComponents();

        fixture = TestBed.createComponent(UIModal);
        fixture.componentRef.setInput('open', true);
        fixture.componentRef.setInput('header', 'Header');
        fixture.componentRef.setInput('description', 'Description');

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
