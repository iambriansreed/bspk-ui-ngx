import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';
import { UIBannerAlertExample } from './example';

describe('UIBannerAlert', () => {
    let fixture: ComponentFixture<UIBannerAlertExample>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIBannerAlertExample],
        }).compileComponents();

        fixture = TestBed.createComponent(UIBannerAlertExample);
        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
