export function toKebabCase(name: string) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // aB -> a-B, 0B -> 0-B
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2') // ABc -> A-Bc, AZAscend -> A-Z-Ascend
        .replace(/([A-Z])(\d)/g, '$1-$2') // A2 -> A-2
        .replace(/([0-9])([A-Z])/g, '$1-$2') // 2F -> 2-F
        .replace(/([a-z])([0-9])/g, '$1-$2') // y2 -> y-2
        .replace(/([A-Z])([A-Z])/g, '$1-$2') // AZ -> A-Z
        .replace(/^-/, '') // Remove leading dash if present
        .toLowerCase();
}

export function toPascalCase(str: string) {
    return str
        .replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase())
        .replace(/(\d+)([a-zA-Z])/g, (_, num, chr) => num + chr.toUpperCase()) // Capitalize after numbers
        .replace(/([a-z])([A-Z]+)/g, (_, a, b) => a + b) // Preserve consecutive uppercase
        .replace(/\s/g, '');
}

export function slugify(value: string[] | string) {
    let slug = [value]
        .flat()
        .join('-')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // aB -> a-B, 0B -> 0-B
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2') // ABc -> A-Bc, AZAscend -> A-Z-Ascend
        .replace(/([A-Z])(\d)/g, '$1-$2') // A2 -> A-2
        .replace(/([0-9])([A-Z])/g, '$1-$2') // 2F -> 2-F
        .replace(/([a-z])([0-9])/g, '$1-$2') // y2 -> y-2
        .replace(/([A-Z])([A-Z])/g, '$1-$2') // AZ -> A-Z
        .replace(/^-/, '') // Remove leading dash if present
        .toLowerCase();

    const slugSegments = slug.split('-');
    slug = slugSegments.filter((segment, index) => segment !== slugSegments[index - 1]).join('-');

    // fix double segments like brand-on-brand -> on-brand, shadow-*-shadow -> shadow-*
    slug = slug.replace(/shadow-([^-]+)-shadow/, 'shadow-$1').replace(/brand-on-brand/, 'brand-on');

    return slug;
}

export function toTitleCase(str: string) {
    return str.replace(/\b([a-z])/g, function (_, initial) {
        return initial.toUpperCase();
    });
}

export function removeComponentQuotes(str: string): string {
    return str.replace(/"component": "([^"]+)"/g, '"component": $1');
}
