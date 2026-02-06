import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ComponentMeta } from '@shared/types';
import { TableColumn } from '@ui/table';
import { UITag } from '@ui/tag';
import { UIFlexDirective } from '../../../ui/src';
import { META } from '../meta';
import { COMPONENT_PHASE_COLORS } from '../utils';
import { TypeProps } from './type-props';

@Component({
    selector: 'app-component-page',
    standalone: true,
    imports: [RouterOutlet, UITag, TypeProps, UIFlexDirective],
    template: ` @if (!component()) {
            <h2>Component Not Found</h2>
        } @else {
            <div ui-flex>
                <h2 style="display: flex; align-items: center; gap: 1rem;">
                    {{ component()!.name }}
                </h2>
                <span style="margin-left: auto;"><ui-tag [color]="phaseColor()" [label]="component()!.phase!" /></span>
            </div>

            @for (line of description(); track $index) {
                <p>{{ line }}</p>
            }

            <h3>Inputs</h3>
            <app-type-props [props]="component()?.props || []" />

            @if (component()?.associatedTypes?.length) {
                <h3>Associated Types</h3>
                @for (type of component()?.associatedTypes; track $index) {
                    <h4>{{ type.name }}</h4>
                    <app-type-props [props]="type.props" />
                }
            }

            <h3>Examples</h3>
            <router-outlet name="example"></router-outlet>
        }`,
})
export class ComponentPage {
    component = signal<ComponentMeta | undefined>(undefined);

    description = computed(() => this.component()?.description.split('\n\n') || []);

    phaseColor = computed(() => {
        const phase = this.component()?.phase;
        return phase ? COMPONENT_PHASE_COLORS[phase] : 'grey';
    });

    propColumns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'default', label: 'Default' },
        { key: 'description', label: 'Description' },
    ];

    propsData = computed(() => {
        return (this.component()?.props || []).map((prop, index) => ({
            ...prop,
            id: `${index}`,
        }));
    });

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe((data: any) => {
            META.components.find((comp) => {
                if (comp.name === data.component) {
                    this.component.set(comp as ComponentMeta);
                }
            });
        });
    }
}
