import { ComponentSettings } from '@shared/types';
import { AvatarGroupProps } from './';

export const AvatarGroup: ComponentSettings<AvatarGroupProps> = {
    defaultValues: {
        count: 5,
        size: 'small',
        color: 'primary',
        surfaceBorder: true,
        items: [
            { name: 'Fezzik', image: '/avatar-01.png' },
            { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
            { name: 'Miracle Max', initials: 'MM', color: 'green' },
            { name: 'Princess Buttercup', showIcon: true },
        ],
    },
};
