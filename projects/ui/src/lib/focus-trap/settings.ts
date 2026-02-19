import { ComponentSettings } from '@shared/types';
import { FocusTrapProps } from './';

export const FocusTrap: ComponentSettings<FocusTrapProps> = {
    content: [
        {
            component: () => import('./advanced-example').then((m) => m.UIFocusTrapAdvancedExample),
            position: 'afterDescription',
        },
    ],
};
