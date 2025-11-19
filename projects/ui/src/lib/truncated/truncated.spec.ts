import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Truncated } from './truncated';

describe('Truncated', () => {
    let component: Truncated;
    let fixture: ComponentFixture<Truncated>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Truncated],
        }).compileComponents();

        fixture = TestBed.createComponent(Truncated);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
