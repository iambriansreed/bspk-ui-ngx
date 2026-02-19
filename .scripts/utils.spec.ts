import { findComponentSelectors } from './meta/main';

describe('Scripts Utils', () => {
    it('findComponentSelectors  - standard', () => {
        const exampleCode = `
            <div>
                <ui-button>Click me</ui-button>
                <p>Some text</p>
                <ui-card>Card content</ui-card>
            </div>
        `;
        const usages = findComponentSelectors(exampleCode, {
            'ui-button': 'UIButton',
            'ui-card': 'UICard',
        });
        expect(usages).toEqual(['UIButton', 'UICard']);
    });

    it('findComponentSelectors  - directive', () => {
        const exampleCode = `
            <div>
                <span ui-text="Hello World"></span>
                <p>Some text</p>
                <span ui-text="Another Text"></span>
            </div>
        `;
        const usages = findComponentSelectors(
            exampleCode,
            {
                'ui-text': 'UITextDirective',
            },
            true,
        );
        expect(usages).toEqual(['UITextDirective']);
    });
});
