import { createComponent, EnvironmentInjector, Type } from '@angular/core';

export function addComponent<T extends Type<any>>(
    env: EnvironmentInjector,
    component: T,
    tagName: string,
    hostElement?: HTMLElement,
) {
    if (typeof document === 'undefined') return null;

    const componentElement = document.createElement(tagName);
    (hostElement || document.body).appendChild(componentElement);

    return createComponent(component, {
        environmentInjector: env,
        hostElement: componentElement,
    });
}
