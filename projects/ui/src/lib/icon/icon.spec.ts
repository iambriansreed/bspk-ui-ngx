import { screen } from '@testing-library/angular';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Icon } from './icon';
import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';

describe('Icon', () => {
    let component: Icon;
    let fixture: ComponentFixture<Icon>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Icon],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(Icon);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render', async () => {
        fixture.componentRef.setInput('name', 'Check');

        const http = TestBed.inject(HttpTestingController);
        http.expectOne('/assets/bspk-icons/Check.svg').flush('<svg></svg>');

        expect(await screen.findByRole('img')).toBeInTheDocument();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
