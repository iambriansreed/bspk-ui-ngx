import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIAvatarGroup } from './avatar-group';

describe('AvatarGroup', () => {
    let component: UIAvatarGroup;
    let fixture: ComponentFixture<UIAvatarGroup>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIAvatarGroup],
        }).compileComponents();

        fixture = TestBed.createComponent(UIAvatarGroup);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
