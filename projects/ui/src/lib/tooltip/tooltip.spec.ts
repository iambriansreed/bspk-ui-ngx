import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tooltip } from './tooltip';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Tooltip', () => {
    let component: Tooltip;
    let fixture: ComponentFixture<Tooltip>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Tooltip],
        }).compileComponents();

        fixture = TestBed.createComponent(Tooltip);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
