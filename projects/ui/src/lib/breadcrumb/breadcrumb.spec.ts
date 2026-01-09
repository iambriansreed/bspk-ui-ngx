import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '../../testutils/hasNoBasicA11yIssues';
import { UIBreadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
    let fixture: ComponentFixture<UIBreadcrumb>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UIBreadcrumb],
        }).compileComponents();

        fixture = TestBed.createComponent(UIBreadcrumb);
        fixture.componentRef.setInput('items', [
            { label: 'Item 1', href: '#link-1' },
            { label: 'Item 2', href: '#link-2' },
            { label: 'Item 3', href: '#link-3' },
            { label: 'Item 4', href: '#link-4' },
            { label: 'Item 5', href: '#link-5' },
        ]);

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
