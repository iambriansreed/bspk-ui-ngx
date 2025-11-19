import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Card', () => {
    let component: Card;
    let fixture: ComponentFixture<Card>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Card],
        }).compileComponents();

        fixture = TestBed.createComponent(Card);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
