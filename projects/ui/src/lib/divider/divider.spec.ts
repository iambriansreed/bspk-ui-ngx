import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIDivider } from './divider';

describe('Divider', () => {
    let component: UIDivider;
    let fixture: ComponentFixture<UIDivider>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIDivider],
        }).compileComponents();

        fixture = TestBed.createComponent(UIDivider);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
