import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '@shared/testing/hasNoBasicA11yIssues';
import { UIInputPhone } from './input-phone';

describe('UIInputPhone', () => {
    let fixture: ComponentFixture<UIInputPhone>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIInputPhone],
        }).compileComponents();

        fixture = TestBed.createComponent(UIInputPhone);
        fixture.componentRef.setInput('name', 'test-input-phone');
        fixture.componentRef.setInput('ariaLabel', 'Phone Number');

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
