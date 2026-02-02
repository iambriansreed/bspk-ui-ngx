import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { IconCloud } from '../icons/cloud';
import { UISwitchOption } from '../switch-option';
import { UIFab } from './fab';

@Component({
    selector: 'ui-fab-example',
    standalone: true,
    imports: [CommonModule, UIFab, UISwitchOption],
    template: `
        <h4>Default</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Default FAB" (onClick)="handleClick('Default')" />
        </div>

        <h4>Events</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Event FAB"
                (onClick)="handleClick('Events')"
                (onBlur)="log('Blur')"
                (onFocus)="log('Focus')"
                (onMouseLeave)="log('Mouse Leave')"
                (onMouseEnter)="log('Mouse Enter')" />
        </div>

        <h4>Size: Small</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Small FAB" size="small" (onClick)="handleClick('Small')" />
        </div>

        <h4>Size: Small with icon</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Small FAB" size="small" (onClick)="handleClick('Small with icon')" [icon]="iconCloud" />
        </div>

        <h4>Size: Medium</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Medium FAB" size="medium" (onClick)="handleClick('Medium')" />
        </div>

        <h4>Size: Medium with Icon</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Medium FAB" size="medium" (onClick)="handleClick('Medium with icon')" [icon]="iconCloud" />
        </div>

        <h4>Variant: Neutral</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Neutral FAB" variant="neutral" (onClick)="handleClick('Neutral')" />
        </div>

        <h4>Variant: Neutral with icon</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Neutral FAB"
                variant="neutral"
                (onClick)="handleClick('Neutral with icon')"
                [icon]="iconCloud" />
        </div>

        <h4>Variant: Primary</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Primary FAB" variant="primary" (onClick)="handleClick('Primary')" />
        </div>

        <h4>Variant: Primary with icon</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Primary FAB"
                variant="primary"
                (onClick)="handleClick('Primary with icon')"
                [icon]="iconCloud" />
        </div>

        <h4>Variant: Secondary</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Secondary FAB" variant="secondary" (onClick)="handleClick('Secondary')" />
        </div>

        <h4>Variant: Secondary with icon</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Secondary FAB"
                variant="secondary"
                (onClick)="handleClick('Secondary with icon')"
                [icon]="iconCloud" />
        </div>

        <h4>Placement: Top Left</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Top Left" placement="top-left" (onClick)="handleClick('Top Left')" />
        </div>

        <h4>Placement: Top Right</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Top Right" placement="top-right" (onClick)="handleClick('Top Right')" />
        </div>

        <h4>Placement: Bottom Left</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Bottom Left" placement="bottom-left" (onClick)="handleClick('Bottom Left')" />
        </div>

        <h4>Placement: Bottom Right</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Bottom Right" placement="bottom-right" (onClick)="handleClick('Bottom Right')" />
        </div>

        <h4>Icon Only</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Icon Only FAB"
                [icon]="iconCloud"
                [iconOnly]="true"
                aria-label="Icon Only FAB"
                (onClick)="handleClick('Icon Only')" />
        </div>

        <h4>Icon Only, variant: neutral</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Icon Only FAB"
                [icon]="iconCloud"
                [iconOnly]="true"
                aria-label="Icon Only FAB"
                variant="neutral"
                (onClick)="handleClick('Neutral Icon Only')" />
        </div>

        <h4>Icon Only, variant: secondary</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Icon Only FAB"
                [icon]="iconCloud"
                [iconOnly]="true"
                aria-label="Icon Only FAB"
                variant="secondary"
                (onClick)="handleClick('Secondary Icon Only')" />
        </div>

        <h4>Icon Only, size: medium</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab
                label="Icon Only FAB"
                [icon]="iconCloud"
                [iconOnly]="true"
                aria-label="Icon Only FAB"
                size="medium"
                (onClick)="handleClick('Medium Icon Only')" />
        </div>

        <h4>With Tooltip</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Tooltip FAB" [icon]="iconCloud" tooltip="Tooltip text" (onClick)="handleClick('Tooltip')" />
        </div>

        <h4>Container: Local</h4>
        <div style="height: 200px; position: relative; border: 1px solid #ccc; margin-bottom: 16px;">
            <ui-fab label="Container: local FAB" container="local" (onClick)="handleClick(' Container Local')" />
        </div>

        <h4>Toggle FAB Container: local/page</h4>
        <div style="margin-bottom: 16px;">
            <ui-switch-option
                name="containerToggle"
                value="container"
                [checked]="isPage"
                (checkedChange)="isPage = $event"
                label="Toggle Container prop" />
        </div>
        <div style="height: 200px; position: relative; border: 1px solid #ccc;">
            <ui-fab
                label="Toggle Container FAB"
                [container]="isPage ? 'page' : 'local'"
                (onClick)="handleClick('Toggle Container')" />
        </div>
    `,
})
export class UIFabExample {
    protected readonly iconCloud = IconCloud;
    protected isPage = false;

    log(msg: string) {
        sendSnackbar(msg);
    }

    protected handleClick(name: string): void {
        sendSnackbar(`${name} Fab clicked!`);
    }
}
