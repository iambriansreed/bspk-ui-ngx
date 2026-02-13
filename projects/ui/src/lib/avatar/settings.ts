import { ComponentSettings } from '@shared/types';
import { AvatarProps } from './';

export const Avatar: ComponentSettings<AvatarProps> = {
    defaultValues: {
        color: 'blue',
        showIcon: true,
        image: '/avatar-01.png',
        initials: 'AR',
        name: 'Andre Giant',
        size: 'large',
        disabled: false,
    },
};
