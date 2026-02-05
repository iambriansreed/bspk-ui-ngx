import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ComponentMeta } from '@shared/types';
import { TableColumn } from '@ui/table';
import { UITag } from '@ui/tag';
import { META } from '../meta';
import { COMPONENT_PHASE_COLORS } from '../utils';
import { TypeProps } from './type-props';

@Component({
    selector: 'app-component-page',
    standalone: true,
    imports: [RouterOutlet, UITag, TypeProps],
    template: ` @if (!component()) {
            <h2>Component Not Found</h2>
        } @else {
            <h2 style="display: flex; align-items: center; gap: 1rem;">
                {{ component()!.name }}
                <span style="margin-left: auto;"><ui-tag [color]="phaseColor()" [label]="component()!.phase!" /></span>
            </h2>

            @for (line of description(); track $index) {
                <p>{{ line }}</p>
            }

            <h3>Properties</h3>
            <app-type-props [props]="component()?.props || []" />

            <h3>Example</h3>
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
// title = this.route.snapshot.data['title'] || '';
