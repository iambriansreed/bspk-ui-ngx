import { ComponentSettings } from '@shared/types';
import { AvatarGroupProps } from './';

export const AvatarGroup: ComponentSettings<AvatarGroupProps> = {
    defaultValues: {
        count: 5,
        size: 'small',
        color: 'primary',
        surfaceBorder: true,
    },
};
