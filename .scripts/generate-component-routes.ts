/**
 *
 * Generates example components for each component example
 * `projects/demo/src/app/examples`.
 *
 *
 * $ npx tsx .scripts/generate-component-routes.ts
 */

// get a list of all example files

import fs from 'fs';

type ComponentMeta = {
  name: string;
  slug: string;
  type: 'component' | 'directive';
  classContent: string;
  template: string;
};

// GENERATE COMPONENT META

const componentMeta: ComponentMeta[] = [];

fs.readdirSync('projects/demo/src/app/examples').forEach((file) => {
  const [slug, _ext] = file.split('.');
  const content = fs.readFileSync(`projects/demo/src/app/examples/${file}`).toString().trim();
  componentMeta.push({
    slug,
    name: slugToName(slug),
    ...parseHtml(content),
  });
});

// GENERATE ROUTES FILE

fs.writeFileSync(
  `projects/demo/src/app/component.routes.ts`,
  `/** generated: ${new Date().toISOString()} */
import { ${componentMeta
    .map(({ name }) => `${name}RouteComponent`)
    .join(', ')} } from './routes/components';
import { NavRoute } from './types';

export const componentItems: NavRoute[] = [
  { title: 'Components', section: true },
  ${componentMeta
    .map(
      ({ name, slug }) => `{ path: '${slug}', component: ${name}RouteComponent, title: '${name}' },`
    )
    .join('\n  ')}
];
`
);

// GENERATE COMPONENT ROUTES FILE

const componentsContent: string[] = [];

const fileImports = [`import { Component } from '@angular/core';`];

componentMeta.forEach(({ name, slug, type, classContent, template }) => {
  if (type === 'component') {
    fileImports.push(
      `import { ${name} } from '../../../../../projects/ui/src/lib/${slug}/${slug}';`
    );
  }

  if (type === 'directive') {
    fileImports.push(
      `import { ${name}Directive } from '../../../../../projects/ui/src/lib/${slug}/${slug}.directive';`
    );
  }

  const componentImports = Array.from(template.matchAll(/<ui-([a-z0-9-]+)( [^>]*)?>/g))
    .flatMap((m) => m[1])
    .map((slug) => slugToName(slug));

  const icons = Array.from(template.matchAll(/<icon-([a-z0-9-]+)( [^>]*)?>/g))
    .flatMap((m) => m[1])
    .map((slug) => ({ slug, name: slugToName(slug) }));

  // import any icons (<icon-add></icon-add>)
  fileImports.push(
    ...icons.map(({ slug, name }) => {
      return `import { Icon${name} } from '../../../../../projects/ui/src/lib/icons/${slug}';`;
    })
  );

  // look for used components
  const imports = [...componentImports, ...icons.map(({ name }) => `Icon${name}`)];

  componentsContent.push(
    type === 'directive'
      ? directiveTemplate({ name, slug, template, imports })
      : componentTemplate({ name, slug, template, classContent, imports })
  );
});

fs.writeFileSync(
  'projects/demo/src/app/routes/components.ts',
  [
    `/** generated: ${new Date().toISOString()} */`,
    fileImports
      // remove duplicate imports
      .filter((line, index, arr) => line === '\n' || arr.indexOf(line) === index)
      .join('\n'),
    ...componentsContent,
  ].join('\n')
);

function parseHtml(content: string): Omit<ComponentMeta, 'name' | 'slug'> {
  const metaRegex = /<!-- ([^:]+): (.*?) -->/g;
  const metaMatch = Array.from(content.matchAll(metaRegex));
  const meta: Record<string, string> = {};
  for (const match of metaMatch) {
    meta[match[1]] = match[2];
  }

  return {
    ...meta,
    type: meta.type === 'directive' ? 'directive' : 'component',
    classContent: meta.class || '',
    template: content.replace(/<!--.*?-->/g, '').trim(),
  };
}

type TemplateParams = {
  name: string;
  slug: string;
  template: string;
  classContent?: string;
  imports?: string[];
};

function componentTemplate({ name, slug, template, classContent, imports }: TemplateParams) {
  return `
@Component({
  selector: '${slug}-route',
  standalone: true,
  imports: [${[...(imports || []), name].join(', ')}],
  template: \`${template}\`,
  styles: [
    \`
      :host {
        display: contents;
      }
    \`,
  ],
})
export class ${name}RouteComponent { ${classContent ? `\n${classContent}\n` : ''}}
`;
}

function directiveTemplate({ name, slug, template, imports }: TemplateParams) {
  return `
@Component({
  selector: '${slug}-route',
  imports: [${[...(imports || []), name + 'Directive'].join(', ')}],
  template: \`${template}\`,
  styles: [
    \`
      :host {
        display: contents;
      }
    \`,
  ],
})
export class ${name}RouteComponent {}
`;
}

function slugToName(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
