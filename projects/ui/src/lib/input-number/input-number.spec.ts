import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';
import { UIInputNumber } from './input-number';

describe('UIInputNumber', () => {
    let fixture: ComponentFixture<UIInputNumber>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIInputNumber],
        }).compileComponents();

        fixture = TestBed.createComponent(UIInputNumber);
        fixture.componentRef.setInput('name', 'test-input');
        fixture.componentRef.setInput('ariaLabel', 'Test Number Input');
        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
