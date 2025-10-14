import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { randomString } from '../../utils/randomString';
import { IconKeyboardArrowDown } from '../icons/keyboard-arrow-down';
import { IconKeyboardArrowUp } from '../icons/keyboard-arrow-up';

export interface AccordionSection {
  /**
   * The content of the accordion.
   *
   * @required
   */
  children?: string | TemplateRef<any>;
  /**
   * The title of the accordion.
   *
   * @required
   */
  title: string;
  /** The subtitle of the accordion. */
  subtitle?: string;
  /** The leading element to display in the accordion header. */

  leading?: string | TemplateRef<any>;
  /** The trailing element to display in the accordion header. */

  trailing?: string | TemplateRef<any>;
  /**
   * If the accordion is initially open.
   *
   * This is ignored if the accordion section disabled property is true.
   *
   * @default false
   */
  isOpen?: boolean;
  /**
   * Indicates whether the accordion is disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The unique identifier for the accordion item.
   *
   * If not provided it will be generated automatically.
   */
  id?: string;
}

/**
 * A vertical stack of collapsible panels or that allows customers to expand or collapse each panel individually to
 * reveal or hide their content.
 *
 *  @example
 * ```html
 * <ui-accordion [singleOpen]="false" [items]="[{title: 'Foo', children: 'Foo Children'}, {title: 'Bar', children: 'Bar Children'}, {title: 'Car', children: 'Car Children'}]"></ui-accordion>
 * ```
 *
 * @name Accordion
 * @phase UXReview
 */
@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [CommonModule, IconKeyboardArrowDown, IconKeyboardArrowUp],
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.scss'],
})
export class Accordion implements OnChanges {
  /**
   * Array of accordion sections
   *
   * @type Array<AccordionSection>
   * @required
   */
  @Input() items: AccordionSection[] = [];
  /**
   * If true only one accordion section can be opened at a time
   *
   * @default true
   */
  @Input() singleOpen: boolean = true;

  openSections: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.items = (this.items || []).map((item) => ({
        ...item,
        id: item.id || `accordion-item-${randomString(8)}`,
      }));

      this.openSections = this.items.filter((i) => i.isOpen).map((i) => i.id!);
    }
  }

  toggleOpen(itemId: string) {
    const isOpen = this.openSections.includes(itemId);

    if (this.singleOpen) {
      this.openSections = isOpen ? [] : [itemId];
      return;
    }

    this.openSections = isOpen
      ? this.openSections.filter((id) => id !== itemId)
      : [...this.openSections, itemId];
  }

  isOpen(itemId: string | undefined) {
    if (!itemId) return false;
    return this.openSections.includes(itemId);
  }

  trackById(_: number, item: AccordionSection) {
    return item.id;
  }

  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
