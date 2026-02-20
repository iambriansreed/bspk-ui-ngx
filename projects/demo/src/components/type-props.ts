import { CommonModule } from '@angular/common';
import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ComponentMetaInput } from '@shared/types';
import { TableColumn, TableRow, UITable, UITableCell } from '@ui/table';
import { UITag } from '@ui/tag';
import { UITxtDirective } from '@ui/txt';
import { AppMarkup } from './markup';

interface PropRow extends ComponentMetaInput, TableRow {}

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
    imports: [UITxtDirective, UITag],
    template: `<span ui-txt="labels-small"> {{ row().name }} </span>
        @if (row().required) {
            <ui-tag color="red" size="x-small" variant="flat" label="required" />
        }`,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: flex; flex-direction: column; gap: var(--spacing-sizing-02);',
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
    imports: [UITag, AppMarkup],
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
        style: 'display: flex; flex-direction: column; gap: var(--spacing-sizing-02); width: 100%;',
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
    props = input<ComponentMetaInput[]>();

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
        },
        {
            key: 'default',
            label: 'Default',
            width: 'auto',
            valign: 'top',
            component: DefaultCell,
        },
    ];

    propsData = computed(() => {
        return (
            this.props()?.map((prop, index) => ({
                ...prop,
                id: `${index}`,
            })) || []
        ).sort((a, b) => {
            // todo:  add controls
            // if (!a.haveControl !== !b.haveControl) return !a.haveControl > !b.haveControl ? 1 : -1;

            if (!a.required !== !b.required) return !a.required > !b.required ? 1 : -1;

            if (!a.disabled !== !b.disabled) return !a.disabled < !b.disabled ? 1 : -1;

            // ensure value props are always first
            if (a.name === 'value') return -1;
            if (b.name === 'value') return 1;

            const propertyNameSort = PROPERTY_NAME_CUSTOM_SORT.find(
                (arr) => arr.includes(a.name) && arr.includes(b.name),
            );

            if (propertyNameSort) {
                const aIndex = propertyNameSort.indexOf(a.name);
                const bIndex = propertyNameSort.indexOf(b.name);
                return aIndex - bIndex;
            }

            return a.name.localeCompare(b.name);
        });
    });
}

export const PROPERTY_NAME_CUSTOM_SORT = [
    //
    ['minRows', 'maxRows'],
    ['min', 'max'],
    ['header', 'body'],
    ['variant', 'width', 'height'],
];
