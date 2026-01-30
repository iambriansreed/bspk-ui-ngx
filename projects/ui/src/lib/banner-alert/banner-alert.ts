import { Component, EventEmitter, Output, ViewEncapsulation, input } from '@angular/core';
import { AlertVariant, AsSignal } from '../../types/common';
import { UIButton } from '../button';
import { IconCheckCircleFill, IconClose, IconErrorFill, IconInfoFill, IconWarningFill } from '../icons';

export interface BannerAlertProps {
    /**
     * The color variant of the banner alert.
     *
     * @default informational
     */
    variant?: AlertVariant;
    /**
     * The header of the banner alert.
     *
     * @required
     */
    header: string;
    /**
     * The body of the banner alert.
     *
     * @type multiline
     * @required
     */
    body: string;
    /**
     * This property may be undefined or an object containing required CallToActionButton properties.
     *
     * @type CallToActionButton
     */
    callToAction?: CallToActionButton;
    /**
     * Is the alert elevated. If true a drop shadow is added.
     *
     * @default false
     */
    elevated?: boolean;
}

export interface CallToActionButton {
    /**
     * The label of the call to action button.
     *
     * @required
     */
    label: string;
    /**
     * The callback function for the call to action button.
     *
     * @required
     */
    onClick: () => void;
}

/**
 * A visual and contextual message used to communicate an important message or notification to users relating to a
 * status or the body content of a page.
 *
 * @name BannerAlert
 * @phase UXReview
 */
@Component({
    selector: 'ui-banner-alert',
    imports: [UIButton, IconErrorFill, IconInfoFill, IconCheckCircleFill, IconWarningFill],
    template: `<div data-icon-bar>
            @if (variant() === 'error') {
                <icon-error-fill />
            } @else if (variant() === 'informational') {
                <icon-info-fill />
            } @else if (variant() === 'success') {
                <icon-check-circle-fill />
            } @else if (variant() === 'warning') {
                <icon-warning-fill />
            }
        </div>
        <div data-content>
            @if (header() || onClose.observed) {
                <div data-header>
                    <span>{{ header() }}</span>
                    @if (onClose.observed) {
                        <ui-button
                            (click)="emitClose()"
                            label="Close"
                            [icon]="IconClose"
                            [iconOnly]="true"
                            [variant]="'tertiary'"
                            [size]="'small'" />
                    }
                </div>
            }
            <div data-body>
                <span>{{ body() }}</span>
                @if (callToAction()) {
                    <ui-button
                        [label]="callToAction()!.label"
                        (click)="callToAction()!.onClick()"
                        [size]="'small'"
                        [variant]="'tertiary'" />
                }
            </div>
        </div>`,
    styleUrl: './banner-alert.scss',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'banner-alert',
        '[attr.data-elevated]': 'elevated() || undefined',
        '[attr.data-variant]': 'variant()',
        role: 'alert',
    },
})
export class UIBannerAlert implements AsSignal<BannerAlertProps> {
    /** Function to call when the banner alert is closed. */
    @Output() onClose = new EventEmitter<void>();

    readonly variant = input<BannerAlertProps['variant']>('informational');
    readonly elevated = input<BannerAlertProps['elevated']>(false);
    readonly header = input.required<BannerAlertProps['header']>();
    readonly body = input.required<BannerAlertProps['body']>();
    readonly callToAction = input<BannerAlertProps['callToAction']>();

    IconClose = IconClose;

    emitClose() {
        this.onClose?.emit();
    }
}
