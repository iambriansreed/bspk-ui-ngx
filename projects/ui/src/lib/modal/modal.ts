import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { IconClose } from '../icons/close';
import { Dialog } from '../dialog/dialog';
import { Button } from '../button/button';

export type ModalCallToAction = { label: string; onClick?: () => void; destructive?: boolean };

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule, PortalModule, IconClose, Dialog, Button],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Modal implements OnChanges, OnDestroy {
  /**
   * Modal header.
   *
   * @example
   *     Change your email
   *
   * @required
   */
  @Input() header = '';
  /**
   * Modal description. Used for the
   * [aria-description](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-description)
   * attribute.
   *
   * @example
   *     Email change confirmation.
   *
   * @required
   */
  @Input() description = '';
  /**
   * Whether to show the cancel button in the footer.
   *
   * Providing a string will set the label of the cancel button.
   *
   * @default false
   */
  @Input() cancelButton: boolean | string = false;
  /**
   * The call to action button to display in the footer of the modal.
   *
   * @example
   *     {
   *      label: 'Confirm',
   *      onClick: () => action('Confirm clicked'),
   *     }
   */
  @Input() callToAction?: ModalCallToAction;
  /**
   * The format of the buttons in the footer. Ignored if not mobile.
   *
   * @default horizontal
   */
  @Input() buttonFormat: 'horizontal' | 'vertical' = 'horizontal';
  /**
   * Determines if the modal is open or closed.
   *
   * @default false
   */
  @Input() open: boolean = false;

  @Output() onClose = new EventEmitter<void>();

  @ViewChild('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    // Modal now delegates opening to the internal Dialog via template bindings.
  }

  public emitClose() {
    this.onClose.emit();
  }

  onCallToActionClick() {
    if (this.callToAction?.onClick) this.callToAction.onClick();
    this.emitClose();
  }

  onCancelClick() {
    this.emitClose();
  }

  ngOnDestroy() {
    // nothing to clean up; dialog handles its own overlay
  }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
