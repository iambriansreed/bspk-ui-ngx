import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Badge } from './badge';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Badge', () => {
    let component: Badge;
    let fixture: ComponentFixture<Badge>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Badge],
        }).compileComponents();

        fixture = TestBed.createComponent(Badge);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
