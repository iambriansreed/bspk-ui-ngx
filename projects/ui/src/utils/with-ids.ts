/** A utility that generates unique IDs for a list of items. */
export function withIds<T>(prefix: string, items: T[]): (T & { id: string })[] {
    return items.map((item, index) => ({
        ...item,
        id: item && typeof item === 'object' && 'id' in item && item.id ? String(item.id) : `${prefix}-item-${index}`,
    }));
}
