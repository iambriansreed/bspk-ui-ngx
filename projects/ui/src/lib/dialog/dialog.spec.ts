import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';
import { UIDialog } from './dialog';

describe('UIDialog', () => {
    let fixture: ComponentFixture<UIDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIDialog],
        }).compileComponents();

        fixture = TestBed.createComponent(UIDialog);
        fixture.componentRef.setInput('open', true);

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
