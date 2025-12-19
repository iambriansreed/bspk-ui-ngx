import { ComponentFixture, TestBed } from '@angular/core/testing';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

import { UIInlineAlert } from './inline-alert';

describe('InlineAlert', () => {
    let fixture: ComponentFixture<UIInlineAlert>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIInlineAlert],
        }).compileComponents();

        fixture = TestBed.createComponent(UIInlineAlert);
        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
