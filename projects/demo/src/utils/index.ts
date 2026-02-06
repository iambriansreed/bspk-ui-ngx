import { ComponentPhase } from '@shared/types';
import { ColorVariant } from '@ui/utils/color-variants';

export const COMPONENT_PHASE_COLORS: Record<ComponentPhase, ColorVariant> = {
    Backlog: 'grey',
    Dev: 'blue',
    UXReview: 'purple',
    Stable: 'green',
    Utility: 'magenta',
};
