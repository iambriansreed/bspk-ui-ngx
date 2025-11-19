import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Button', () => {
    let component: Button;
    let fixture: ComponentFixture<Button>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Button],
        }).compileComponents();

        fixture = TestBed.createComponent(Button);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
