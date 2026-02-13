import { ComponentSettings } from '@shared/types';
import { BadgeProps } from './';

export const Badge: ComponentSettings<BadgeProps> = {
    defaultValues: {
        count: 5,
        size: 'small',
        color: 'primary',
        surfaceBorder: true,
    },
};
