import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';

import { Accordion } from './accordion';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Accordion', () => {
    let component: Accordion;
    let fixture: ComponentFixture<Accordion>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Accordion],
        }).compileComponents();

        fixture = TestBed.createComponent(Accordion);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
