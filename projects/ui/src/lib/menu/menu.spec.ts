import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIMenu } from './menu';

describe('Menu', () => {
    let component: UIMenu;
    let fixture: ComponentFixture<UIMenu>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIMenu],
        }).compileComponents();

        fixture = TestBed.createComponent(UIMenu);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('label', 'User menu');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
