import { ComponentFixture } from '@angular/core/testing';
import { axe } from 'jest-axe';

/**
 * A utility function to test for basic accessibility issues using jest-axe.
 *
 * @example
 *
 * @param ComponentFixture - A component fixture representing the component to be tested.
 * @returns An async function that performs the accessibility test.
 */
export const hasNoBasicA11yIssues = async (fixture: ComponentFixture<unknown>) => {
    const results = await axe(fixture.nativeElement);

    return expect(results).toHaveNoViolations();
};
