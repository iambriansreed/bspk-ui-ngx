import { Component, computed, input } from '@angular/core';
import { ComponentMetaProp } from '@shared/types';
import { TableColumn, TableRow, UITable, UITableCell } from '@ui/table';
import { UITag } from '@ui/tag';
import { UITxtDirective } from '@ui/txt';
import { Markup } from './markup';

interface PropRow extends ComponentMetaProp, TableRow {}

@Component({
    selector: 'app-name-cell',
    imports: [UITxtDirective],
    template: `<span ui-txt="labels-small"> {{ row().name }} </span> `,
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
        @if (row().type) {
            <div data-type-options>
                <ui-tag color="blue" [label]="row().type!" size="x-small" variant="flat" />
            </div>
        }
    `,
})
class DescriptionTypeCell extends UITableCell<PropRow> {}

@Component({
    selector: 'app-type-props',
    standalone: true,
    imports: [UITable],
    template: ` <ui-table [columns]="propColumns" [data]="propsData()" /> `,
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
