import { Component } from '@angular/core';

@Component({
  selector: 'home-route',
  standalone: true,
  template: `
    <section
      style="display:flex; flex-direction:column; align-items:center; padding:var(--spacing-sizing-10); text-align:center;"
    >
      <h1>BSPK: The Foundation for Your Next Project</h1>
      <p>
        A set of custom designed components that you can extend and build on. BSPK makes following
        the Bespoke Design System easier than ever. Open Source. Open Code.
      </p>
    </section>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class HomeRouteComponent {}
