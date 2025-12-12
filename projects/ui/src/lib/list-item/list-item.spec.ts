import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIListItem } from './list-item';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('UIListItem', () => {
    let fixture: ComponentFixture<UIListItem>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIListItem],
        }).compileComponents();

        fixture = TestBed.createComponent(UIListItem);
        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
