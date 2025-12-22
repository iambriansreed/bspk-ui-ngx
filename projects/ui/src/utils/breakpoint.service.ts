import { Injectable, signal } from '@angular/core';

export type BreakpointLabel = 'large' | 'medium' | 'small' | 'xLarge' | 'xxLarge';

/** The max and min widths for each breakpoint label. */
export const BREAKPOINTS: { label: BreakpointLabel; min: number; max: number }[] = [
    { label: 'small', min: 0, max: 640 },
    { label: 'medium', min: 641, max: 768 },
    { label: 'large', min: 769, max: 1024 },
    { label: 'xLarge', min: 1025, max: 1280 },
    { label: 'xxLarge', min: 1281, max: 1536 },
] as const;

/** Service to provide reactive signals for responsive breakpoints and device orientation. */
@Injectable({
    providedIn: 'root',
})
export class UIBreakpointService {
    // use signals to track current breakpoint
    currentBreakpointSignal = signal<BreakpointLabel>(this.currentBreakpoint);

    // on service init, set up resize listener to update breakpoint signal
    constructor() {
        window.addEventListener('resize', () => {
            this.currentBreakpointSignal.set(this.currentBreakpoint);
        });
    }

    // return current breakpoint based on window width and set up resize listener to update on changes
    get currentBreakpoint(): BreakpointLabel {
        const width = window.innerWidth;
        return BREAKPOINTS.find((breakpoint) => breakpoint.min <= width && breakpoint.max >= width)?.label || 'xxLarge';
    }

    onDestroy() {
        window.removeEventListener('resize', () => {
            this.currentBreakpointSignal.set(this.currentBreakpoint);
        });
    }
}
