import { Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ui-badge',
  standalone: true,
  templateUrl: './badge.html',
  styleUrls: ['./badge.scss', '../styles/base.scss', '../styles/colors.scss'],
})
export class Badge implements AfterViewInit {
  @Input() count: number | undefined = 1;
  @Input() size: 'small' | 'x-small' = 'small';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() surfaceBorder: boolean = false;
  
  hasProjectedContent = false;

  @ViewChild('contentWrapper', { static: false }) contentWrapper!: ElementRef<HTMLSpanElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
  const nodes = this.contentWrapper.nativeElement.childNodes;
  this.hasProjectedContent = Array.from(nodes).some(
    node =>
      node.nodeType === Node.ELEMENT_NODE ||
      (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
  );
  this.cdr.detectChanges();
}
}