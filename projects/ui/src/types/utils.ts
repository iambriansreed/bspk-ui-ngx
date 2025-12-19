import { InputSignal } from '@angular/core';

export type AsSignal<T> = { [K in keyof T]: InputSignal<T[K] | undefined> };

export type AlertVariant = 'error' | 'informational' | 'success' | 'warning';
