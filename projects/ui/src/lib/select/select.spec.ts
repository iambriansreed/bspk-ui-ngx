import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UISelect } from './select';

describe('Select', () => {
    let component: UISelect;
    let fixture: ComponentFixture<UISelect>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UISelect],
        }).compileComponents();

        fixture = TestBed.createComponent(UISelect);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('items', [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
        ]);
        fixture.componentRef.setInput('name', 'example-select');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
