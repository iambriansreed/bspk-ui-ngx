import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '@shared/testing/hasNoBasicA11yIssues';
import { UIInputPhoneField } from './input-phone-field';

describe('UIInputPhoneField', () => {
    let fixture: ComponentFixture<UIInputPhoneField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIInputPhoneField],
        }).compileComponents();

        fixture = TestBed.createComponent(UIInputPhoneField);
        fixture.componentRef.setInput('name', 'test-input');
        fixture.componentRef.setInput('ariaLabel', 'Test Input');

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
