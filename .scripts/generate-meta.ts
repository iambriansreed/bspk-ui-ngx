const generateMeta = (): {
    title: string;
    path: string;
    data: {
        name: string;
        slug: string;
        description: string;
        phase: string;
        example?: string;
    };
}[] => {
    const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

    // fund compoennts that end with 'ComponentNameExample' and their base component 'ComponentName'

    const exampleComponents = metadata.components.filter(
        (comp: any) => comp.name.endsWith('Example') && comp.name.startsWith('UI'),
    );

    const baseComponents = metadata.components.filter((comp: any) =>
        exampleComponents.some((exComp: any) => exComp.name === `${comp.name}Example`),
    );

    return baseComponents.map((comp: any) => {
        const exampleComp = exampleComponents.find((exComp: any) => exComp.name === `${comp.name}Example`);

        const slug = comp.name
            .replace(/^UI/, '')
            .replace(/([a-z])([A-Z])/g, (_: any, a: any, b: string) => `${a}-${b}`)
            .toLowerCase();

        const name = toPascalCase(comp.name.replace(/^UI/, ''));

        const example = comp.rawdescription.match(/```html([\s\S]*?)```;/)?.[1]?.trim() || '';

        // remove code from rawdescription
        const description = comp.rawdescription.replace(/```html[\s\S]*?```;/, '').trim();

        return {
            title: name,
            name,
            path: slug,
            data: {
                name,
                slug,
                descriptionExample: comp.description,
                description,
                phase: comp.tags?.phase || 'Dev',
                example,
            },
        };
    });
};
