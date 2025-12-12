import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIListItem } from './list-item';
import { IconFolder } from '../icons/folder';
import { IconChevronRight } from '../icons/chevron-right';
import { IconMoreVert } from '../icons/more-vert';
import { IconDelete } from '../icons/delete';
import { sendSnackbar } from '../../utils/sendSnackbar';
import { UIButton } from '../button';

@Component({
    selector: 'ui-list-item-example',
    standalone: true,
    imports: [CommonModule, UIListItem, IconFolder, IconChevronRight, UIButton, IconMoreVert],
    template: `
        <h2>List Item</h2>

        <h3>Basic</h3>
        <div style="width: 360px; display: grid; gap: 16px">
            <ui-list-item
                label="Death Star Plans"
                subText="Last modified: May 25, 1977"
                (clicked)="onClick('Downloading blueprints...')">
            </ui-list-item>
        </div>

        <h3>Leading avatar and trailing delete (as="div")</h3>
        <div style="width: 360px; display: grid; gap: 16px">
            <ui-list-item
                as="div"
                label="File 13 nice"
                subText="Last modified: Jan 21, 2024"
                (clicked)="onClick('Clicked Open Folder button')">
                <span data-leading>
                    <span
                        style="
                            width: 28px;
                            height: 28px;
                            border-radius: 50%;
                            background: #4b6bfb;
                            color: white;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 12px;
                            font-weight: 600;
                        "
                        >FR</span
                    >
                </span>
                <span data-trailing>
                    <ui-button
                        variant="tertiary"
                        size="small"
                        (click)="onClick('Delete clicked')"
                        [icon]="iconDelete"
                        [iconOnly]="true"
                        label="Delete file">
                    </ui-button>
                </span>
            </ui-list-item>
        </div>

        <h3>As anchor (as="a") with href</h3>
        <div style="width: 360px; display: grid; gap: 16px">
            <ui-list-item
                as="a"
                href="/list-item/#example"
                target="_blank"
                rel="noopener"
                label="Spec Document"
                subText="View online">
                <span data-leading><icon-folder /></span>
                <span data-trailing><icon-chevron-right /></span>
            </ui-list-item>
        </div>

        <h3>As button (as="button") with trailing icon</h3>
        <div style="width: 360px; display: grid; gap: 16px">
            <ui-list-item
                as="button"
                label="Project Report Q4"
                subText="Edited: Nov 11, 2025"
                (click)="onClick('Opening report options...')">
                <span data-leading>
                    <span
                        style="
                            width: 28px;
                            height: 28px;
                            border-radius: 50%;
                            background: #10b981;
                            color: white;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 12px;
                            font-weight: 600;
                        "
                        >PR</span
                    >
                </span>
                <span data-trailing>
                    <icon-more-vert />
                </span>
            </ui-list-item>
        </div>

        <h3>Trailing button</h3>
        <div style="width: 360px; display: grid; gap: 16px">
            <ui-list-item as="div" label="Design Assets" subText="Updated: Oct 03, 2025">
                <span data-leading><icon-folder /></span>
                <span data-trailing>
                    <ui-button label="Rename" variant="tertiary" size="x-small" (click)="onClick('Rename clicked')" />
                </span>
            </ui-list-item>
        </div>
    `,
})
export class UIListItemExample {
    iconDelete = IconDelete;

    onClick(msg: string) {
        sendSnackbar(msg);
    }
}
