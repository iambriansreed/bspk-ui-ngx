import { ComponentFixture, TestBed } from '@angular/core/testing';

import { axe, toHaveNoViolations } from 'jest-axe';

import { UIBreadcrumb, BreadcrumbItem } from './breadcrumb';

expect.extend(toHaveNoViolations);

describe('UIBreadcrumb', () => {
    let component: UIBreadcrumb;
    let fixture: ComponentFixture<UIBreadcrumb>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIBreadcrumb],
        }).compileComponents();

        fixture = TestBed.createComponent(UIBreadcrumb);
        component = fixture.componentInstance;
    });

    describe('Rendering', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should not render with less than 2 items', () => {
            fixture.componentRef.setInput('items', [{ label: 'Item 1', href: '#1' }]);
            fixture.detectChanges();

            const nav = fixture.nativeElement.querySelector('nav');
            expect(nav).toBeNull();
        });

        it('should render with exactly 2 items', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const nav = fixture.nativeElement.querySelector('nav');
            expect(nav).toBeTruthy();
            expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
        });

        it('should render with 5 items without dropdown', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Level 1', href: '#1' },
                { label: 'Level 2', href: '#2' },
                { label: 'Level 3', href: '#3' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const nav = fixture.nativeElement.querySelector('nav');
            expect(nav).toBeTruthy();

            const links = fixture.nativeElement.querySelectorAll('a');
            expect(links.length).toBe(4);
        });

        it('should render with dropdown for 6+ items', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Level 1', href: '#1' },
                { label: 'Level 2', href: '#2' },
                { label: 'Level 3', href: '#3' },
                { label: 'Level 4', href: '#4' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const nav = fixture.nativeElement.querySelector('nav');
            expect(nav).toBeTruthy();

            const breadcrumbDropdown = fixture.nativeElement.querySelector('ui-breadcrumb-dropdown');
            expect(breadcrumbDropdown).toBeTruthy();
        });

        it('should set aria-current on the last item', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const lastLi = fixture.nativeElement.querySelectorAll('ol > li')[1];
            expect(lastLi.getAttribute('aria-current')).toBe('page');
        });
    });

    describe('Accessibility', () => {
        it('should not have any accessibility violations with minimum items', async () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const results = await axe(fixture.nativeElement);
            expect(results).toHaveNoViolations();
        });

        it('should have navigation landmark with aria-label', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const nav = fixture.nativeElement.querySelector('nav');
            expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
        });
    });

    describe('Computed Properties', () => {
        beforeEach(() => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Level 1', href: '#1' },
                { label: 'Level 2', href: '#2' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();
        });

        it('should identify first item correctly', () => {
            expect(component.firstItem()).toEqual({ label: 'Home', href: '#home' });
        });

        it('should identify last item correctly', () => {
            expect(component.lastItem()).toEqual({ label: 'Current', href: '#current' });
        });

        it('should identify middle items correctly', () => {
            const middleItems = component.middleItems();
            expect(middleItems.length).toBe(2);
            expect(middleItems[0]).toEqual({ label: 'Level 1', href: '#1' });
            expect(middleItems[1]).toEqual({ label: 'Level 2', href: '#2' });
        });

        it('should render when shouldRender is true', () => {
            expect(component.shouldRender()).toBe(true);
        });
    });

    describe('ID Generation', () => {
        it('should use provided id', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.componentRef.setInput('id', 'test-breadcrumb');
            fixture.detectChanges();

            const nav = fixture.nativeElement.querySelector('nav');
            expect(nav.id).toBe('test-breadcrumb');
        });

        it('should generate unique id if not provided', () => {
            const items: BreadcrumbItem[] = [
                { label: 'Home', href: '#home' },
                { label: 'Current', href: '#current' },
            ];
            fixture.componentRef.setInput('items', items);
            fixture.detectChanges();

            const id = component.id();
            expect(id).toBeTruthy();
            expect(id).toMatch(/^breadcrumb-[a-z0-9]+$/);
        });
    });
});
