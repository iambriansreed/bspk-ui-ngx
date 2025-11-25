import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Button', () => {
    let fixture: ComponentFixture<Button>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Button],
        }).compileComponents();

        fixture = TestBed.createComponent(Button);
        fixture.componentRef.setInput('label', 'Example label');

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
