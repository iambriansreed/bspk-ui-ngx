import { CommonModule } from '@angular/common';
import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ComponentMetaProp } from '@shared/types';
import { TableColumn, TableRow, UITable, UITableCell } from '@ui/table';
import { UITag } from '@ui/tag';
import { UITxtDirective } from '@ui/txt';
import { Markup } from './markup';

interface PropRow extends ComponentMetaProp, TableRow {}

/*
 *  
typeof prop.libraryDefault === 'undefined' ? (
    <Tag color="yellow" label="None" size="x-small" variant="flat" />
) : (
    <Tag
        color="green"
        label={prop.libraryDefault != null ? prop.libraryDefault.toString() : ''}
        size="x-small"
        variant="flat"
    />
),
 */

@Component({
    selector: 'app-default-cell',
    imports: [CommonModule, UITag],
    template: `@if (row().default === undefined) {
            <ui-tag color="yellow" label="None" size="x-small" variant="flat" />
        } @else {
            <ui-tag color="green" [label]="row().default || ''" size="x-small" variant="flat" />
        }`,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        'style.display': 'contents',
    },
})
class DefaultCell extends UITableCell<PropRow> {}

@Component({
    selector: 'app-name-cell',
    imports: [UITxtDirective],
    template: `<span ui-txt="labels-small"> {{ row().name }} </span> `,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        'style.display': 'contents',
    },
})
class NameCell extends UITableCell<PropRow> {}

/*
todo: add 

{'minimum' in prop && (
    <Txt
        as="div"
        style={{
            fontStyle: 'italic',
            color: 'var(--foreground-neutral-on-surface-variant-02)',
        }}
        variant="labels-small"
    >{`Minimum: ${prop.minimum}`}</Txt>
)}
{'maximum' in prop && (
    <Txt
        as="div"
        style={{
            fontStyle: 'italic',
            color: 'var(--foreground-neutral-on-surface-variant-02)',
        }}
        variant="labels-small"
    >{`Maximum: ${prop.maximum}`}</Txt>
)}

*/
@Component({
    selector: 'app-description-type-cell',
    imports: [UITag, Markup],
    template: `
        <app-markup data-description [source]="row().description" />
        <div data-type-options>
            @for (typeLabel of [row().type].flat(); track typeLabel) {
                @if (typeLabel) {
                    <ui-tag color="blue" [label]="typeLabel" size="x-small" variant="flat" />
                }
            }
        </div>
    `,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        'style.display': 'contents',
    },
})
class DescriptionTypeCell extends UITableCell<PropRow> {}

@Component({
    selector: 'app-type-props',
    imports: [UITable],
    template: ` <ui-table [pageSize]="99" [columns]="propColumns" [data]="propsData()" /> `,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-type-props': '',
    },
})
export class TypeProps {
    props = input<ComponentMetaProp[]>();

    propColumns: TableColumn<PropRow>[] = [
        {
            key: 'name',
            label: 'Name',
            width: 'auto',
            valign: 'top',
            component: NameCell,
        },
        {
            key: 'description-type',
            label: 'Description / Type',
            width: '1fr',
            valign: 'top',
            component: DescriptionTypeCell,
            // formatter: (row) => (
            //     <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sizing-02)' }}>
            //         {row['description-type']}
            //     </div>
            // ),
        },
        {
            key: 'default',
            label: 'Default',
            width: 'auto',
            valign: 'top',
            component: DefaultCell,
        },
        // !!onChange && {
        //     key: 'controls',
        //     label: 'Controls',
        //     width: '200px',
        //     valign: 'top',
        // },
    ];

    propsData = computed(() => {
        return (
            this.props()?.map((prop, index) => ({
                ...prop,
                id: `${index}`,
            })) || []
        );
    });
}
