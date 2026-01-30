import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { IconAccessible } from '../icons/accessible';
import { IconAdd } from '../icons/add';
import { IconBakeryDining } from '../icons/bakery-dining';
import { IconBlock } from '../icons/block';
import { IconCloud } from '../icons/cloud';
import { IconDarkMode } from '../icons/dark-mode';
import { IconEgg } from '../icons/egg';
import { IconGarage } from '../icons/garage';
import { IconIcecream } from '../icons/icecream';
import { IconLightMode } from '../icons/light-mode';
import { IconModeCool } from '../icons/mode-cool';
import { IconPets } from '../icons/pets';
import { IconPlayPause } from '../icons/play-pause';
import { IconRemove } from '../icons/remove';
import { IconReplay } from '../icons/replay';
import { ChipGroupItemProps, UIChipGroup } from './chip-group';

@Component({
    selector: 'ui-chip-group-example',
    standalone: true,
    imports: [CommonModule, UIChipGroup],
    template: `
        <h4>Basic</h4>
        <div style="width: 500px">
            <ui-chip-group [items]="basicChips" />
        </div>

        <h4>Scroll</h4>
        <div style="width: 500px">
            <ui-chip-group
                overflow="scroll"
                [items]="[
                    { label: 'Chip 1', trailingIcon: iconRemove },
                    { label: 'Chip 2', trailingIcon: iconAdd },
                    { label: 'Chip 3', trailingBadge: { count: 2 } },
                    { label: 'Chip 4', trailingIcon: iconReplay },
                    { label: 'Chip 5 selected = true', trailingIcon: iconPlayPause, selected: true },
                    { label: 'Chip 6 disabled = true', trailingIcon: iconBlock, disabled: true },
                ]">
            </ui-chip-group>
        </div>

        <h4>Scroll & Flat</h4>
        <div style="width: 500px">
            <ui-chip-group
                overflow="scroll"
                [items]="[
                    { label: 'Chip 1', leadingIcon: iconModeCool, flat: true },
                    { label: 'Chip 2', leadingIcon: iconLightMode, flat: true },
                    { label: 'Chip 3', leadingIcon: iconCloud, trailingBadge: { count: 2 }, flat: true },
                    { label: 'Chip 4', leadingIcon: iconAdd, flat: true },
                    { label: 'Chip 5 selected = true', leadingIcon: iconDarkMode, selected: true, flat: true },
                    { label: 'Chip 6 disabled = true', leadingIcon: iconEgg, disabled: true, flat: true },
                ]">
            </ui-chip-group>
        </div>
    `,
})
export class UIChipGroupExample {
    protected readonly basicChips: ChipGroupItemProps[] = [
        {
            label: 'Chip 1',
            leadingIcon: IconIcecream,
            click: () => sendSnackbar('Chip 1 clicked'),
        },
        { label: 'Chip 2', leadingIcon: IconAccessible, click: () => sendSnackbar('Chip 2 clicked') },
        {
            label: 'Chip 3',
            leadingIcon: IconAdd,
            trailingBadge: { count: 2 },
            click: () => sendSnackbar('Chip 3 clicked'),
        },
        { label: 'Chip 4', leadingIcon: IconGarage, click: () => sendSnackbar('Chip 4 clicked') },
        {
            label: 'Chip 5 selected = true',
            leadingIcon: IconBakeryDining,
            selected: true,
            click: () => sendSnackbar('Chip 5 clicked'),
        },
        {
            label: 'Chip 6 disabled = true',
            leadingIcon: IconPets,
            disabled: true,
            click: () => sendSnackbar('Chip 6 clicked'),
        },
    ];

    protected readonly iconIcecream = IconIcecream;
    protected readonly iconAccessible = IconAccessible;
    protected readonly iconAdd = IconAdd;
    protected readonly iconGarage = IconGarage;
    protected readonly iconBakeryDining = IconBakeryDining;
    protected readonly iconPets = IconPets;
    protected readonly iconRemove = IconRemove;
    protected readonly iconReplay = IconReplay;
    protected readonly iconPlayPause = IconPlayPause;
    protected readonly iconBlock = IconBlock;
    protected readonly iconModeCool = IconModeCool;
    protected readonly iconLightMode = IconLightMode;
    protected readonly iconCloud = IconCloud;
    protected readonly iconDarkMode = IconDarkMode;
    protected readonly iconEgg = IconEgg;
}
