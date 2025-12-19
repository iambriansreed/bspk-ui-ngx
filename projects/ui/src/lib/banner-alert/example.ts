import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/sendSnackbar';
import { IconAdd } from '../icons/add';
import { UIBannerAlert } from './banner-alert';

@Component({
    selector: 'ui-badge-example',
    standalone: true,
    imports: [CommonModule, UIBannerAlert],
    template: `
        <h2>BannerAlert</h2>

        <h3>Informational</h3>
        <ui-banner-alert header="Example Header" body="Example body text" variant="informational" (onClose)="onClose()">
        </ui-banner-alert>

        <h3>Success</h3>
        <ui-banner-alert header="Example Header" body="Example body text" variant="success"></ui-banner-alert>

        <h3>Error</h3>
        <ui-banner-alert header="Example Header" body="Example body text" variant="error"></ui-banner-alert>

        <h3>Warning</h3>
        <ui-banner-alert header="Example Header" body="Example body text" variant="warning"></ui-banner-alert>

        <h3>Elevated</h3>
        <ui-banner-alert header="Example Header" body="Example body text" variant="informational" [elevated]="true">
        </ui-banner-alert>

        <h3>Call to action</h3>
        <ui-banner-alert
            header="Example Header"
            body="Example body text"
            variant="informational"
            [callToAction]="{ label: 'Click me', onClick: onCta }">
        </ui-banner-alert>
    `,
})
export class UIBannerAlertExample {
    protected readonly iconAdd = IconAdd;

    onClose() {
        sendSnackbar('Banner closed');
    }

    onCta() {
        sendSnackbar('Call to action clicked');
    }
}
