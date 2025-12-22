import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIRadioGroup } from './radio-group';

describe('RadioGroup', () => {
    let component: UIRadioGroup;
    let fixture: ComponentFixture<UIRadioGroup>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIRadioGroup],
        }).compileComponents();

        fixture = TestBed.createComponent(UIRadioGroup);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
