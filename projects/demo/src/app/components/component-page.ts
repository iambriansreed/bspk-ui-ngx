import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UITag } from '../../../../ui/src/lib/tag/tag';
import { ComponentDemo } from '../types';

@Component({
    selector: 'app-component-page',
    standalone: true,
    imports: [RouterOutlet, UITag],
    template: ` @if (!component) {
            <h2>Component Not Found</h2>
        } @else {
            <h2 style="display: flex; align-items: center; gap: 1rem;">
                {{ component.name }}
                <span style="margin-left: auto;"><ui-tag color="primary" [label]="component.phase" /></span>
            </h2>

            <p>{{ component!.description }}</p>
            <router-outlet name="example"></router-outlet>
        }`,
})
export class ComponentPage {
    component: ComponentDemo | undefined;

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe((data) => {
            this.component = data as ComponentDemo;
        });
    }
}
// title = this.route.snapshot.data['title'] || '';
