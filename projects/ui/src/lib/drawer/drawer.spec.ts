import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drawer } from './drawer';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Drawer', () => {
    let component: Drawer;
    let fixture: ComponentFixture<Drawer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Drawer],
        }).compileComponents();

        fixture = TestBed.createComponent(Drawer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
