import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { hasNoBasicA11yIssues } from '../../../ui/src/testutils/hasNoBasicA11yIssues';

describe('App', () => {
    let fixture: ComponentFixture<App>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [App],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(App);
        fixture.detectChanges();
    });

    it('should create the app', () => {
        const app = fixture.componentInstance;

        expect(app).toBeTruthy();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
