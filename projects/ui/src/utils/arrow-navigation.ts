import { computed, effect, signal } from '@angular/core';
import { UtilityBase } from '../types/common';
import { KeyboardEventCode } from './keyboard';
import { keydownHandler, KeysCallback } from './keydown-handler';

export type ArrowKeyNames = Extract<KeyboardEventCode, `Arrow${string}`>;

const ARROW_KEYS: ArrowKeyNames[] = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

const DEFAULT_INCREMENTS: Record<ArrowKeyNames, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -1,
    ArrowDown: 1,
};

export interface ArrowNavigationProps {
    /**
     * An array of string IDs representing the navigable elements. These IDs should correspond to the `id` attributes of
     * the elements in the DOM. Ensure the elements are not disabled.
     */
    ids?: string[];
    /**
     * An optional callback function that is invoked when an arrow key is pressed. This function receives the key name,
     * the keyboard event, and the next active element ID. If the function returns `true`, the default navigation
     * behavior is prevented; if it returns `false` or is not provided, the default behavior proceeds.
     */
    callback?: (params: ArrowKeyNavigationCallbackParams) => boolean;
    /** Optional configuration to set navigation direction increments. */
    increments?: Record<ArrowKeyNames, number>;
    /**
     * The ID of the element that should be active by default. If not provided, the first ID in the `ids` array will be
     * used.
     */
    defaultActiveId?: string;
    /** The ID of the currently active element. */
    activeElementId: string | null;
}

export type ArrowKeyNavigationCallbackParams = Pick<ArrowNavigationProps, 'activeElementId'> & {
    increment: number;
    key: ArrowKeyNames;
    event: KeyboardEvent;
};

/**
 * A hook to manage arrow key navigation for a list of elements.
 *
 * @example
 *     const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation(['id1', 'id2', 'id3']);
 *
 * @returns An object containing:
 *
 *   - `activeElementId`: The ID of the currently active element.
 *   - `setActiveElementId`: A function to manually set the active element ID.
 *   - `arrowKeyCallbacks`: An object with callback functions for arrow key navigation.
 */
export class ArrowNavigationUtility implements UtilityBase<ArrowNavigationProps> {
    readonly props = signal<ArrowNavigationProps>({
        ids: [],
        activeElementId: null,
        defaultActiveId: undefined,
        increments: DEFAULT_INCREMENTS,
        callback: undefined,
    });

    readonly arrowKeyCallbacks = computed(() => {
        return Object.fromEntries(
            ARROW_KEYS.map((key) => [
                key,
                (event: KeyboardEvent) => {
                    const { ids, increments, callback, activeElementId } = this.props();

                    if (!ids || !increments) return;

                    let nextIndex = 0;
                    let currentIndex = 0;
                    let nextId = ids[nextIndex];
                    const increment = increments[key];

                    if (activeElementId) {
                        currentIndex = ids.indexOf(activeElementId);
                        nextIndex = (currentIndex + increment + ids.length) % ids.length;
                        nextId = ids[nextIndex];
                    }

                    if (
                        typeof callback === 'function' &&
                        callback({ key, event, activeElementId: nextId, increment }) === false
                    )
                        return;
                    event.preventDefault();
                    this.setActiveElementId(nextId);
                },
            ]),
        ) as KeysCallback;
    });

    constructor() {
        effect(() => {
            const { ids, activeElementId } = this.props();

            // If the active element is not in the list, reset the first ID as active
            if (ids && activeElementId && !ids.includes(activeElementId)) {
                this.setActiveElementId(ids[0] || null);
            }
        });
    }

    destroy() {
        this.props.set({
            ids: [],
            activeElementId: null,
            defaultActiveId: undefined,
            callback: undefined,
        });
    }

    setActiveElementId(id: string | null) {
        this.updateProps({ activeElementId: id });

        if (id)
            document.querySelector(`[id="${id}"]`)?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
                inline: 'nearest',
            });
    }

    updateProps(props: Partial<ArrowNavigationProps>) {
        this.props.set({
            ...this.props(),
            ...props,
        });
    }

    init(props: Partial<ArrowNavigationProps>) {
        this.updateProps(props);
    }

    handleKeydown(event: KeyboardEvent) {
        keydownHandler(this.arrowKeyCallbacks(), {
            preventDefault: true,
            stopPropagation: true,
        })(event);
    }
}
