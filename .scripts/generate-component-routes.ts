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

const components: {
  name: string;
  slug: string;
  type: string;
  classContent: string;
  template: string;
}[] = [];

fs.readdirSync('projects/demo/src/app/examples').forEach((file) => {
  const [slug, _ext] = file.split('.');
  const content = fs.readFileSync(`projects/demo/src/app/examples/${file}`).toString().trim();

  // derive component name from slug
  const name = slugToName(slug);

  // get meta info ftom html comment
  const { meta, code } = parseHtml(content);

  components.push({
    name,
    slug,
    type: meta.type || 'component',
    classContent: meta.class,
    template: code,
  });
});

fs.writeFileSync(
  `projects/demo/src/app/component.routes.ts`,
  `/**
@generated: ${new Date().toISOString()}
*/
` +
    components
      .map(({ name, slug }) => `import { ${name}RouteComponent } from './routes/${slug}';`)
      .join('\n') +
    `
import { NavRoute } from './types';

export const componentItems: NavRoute[] = [
  { title: 'Components', section: true },
  ${components
    .map(
      ({ name, slug }) => `{ path: '${slug}', component: ${name}RouteComponent, title: '${name}' },`
    )
    .join('\n  ')}
];
`
);

const componentsFile = [
  `/** generated: ${new Date().toISOString()} */`,
  `import { Component } from '@angular/core';`,
];

components.forEach(({ name, slug, type, classContent, template }) => {
  if (type === 'component') {
    componentsFile.push(
      `import { ${name} } from '../../../../../projects/ui/src/lib/${slug}/${slug}';`
    );
  }

  if (type === 'directive') {
    componentsFile.push(
      `import { ${name}Directive } from '../../../../../projects/ui/src/lib/${slug}/${slug}.directive';`
    );
  }

  // import any icons (<icon-add></icon-add>)
  componentsFile.push(
    ...Array.from(template.matchAll(/<icon-([a-z0-9-]+)( [^>]*)?>/g))
      .flatMap((m) => m[1])
      .map((iconTag) => {
        const name = slugToName(iconTag);
        return `import { Icon${name} } from '../../../../../projects/ui/src/lib/icons/${iconTag}';`;
      })
  );

  // ?.forEach((iconTag) => {
  //   const iconName = iconTag
  //     .replace('<', '')
  //     .replace('>', '')
  //     .split(' ')[0]
  //     .split('-')
  //     .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  //     .join('');

  //   componentsFile.push(
  //     `import { ${iconName} } from '../../../../../projects/ui/src/lib/icons/${
  //       iconTag.replace('<', '').replace('>', '').split(' ')[0]
  //     }.icon';`
  //   );
  // });
});

fs.writeFileSync(
  'projects/demo/src/app/routes/components.ts',
  componentsFile
    // remove duplicate imports
    .filter((line, index, arr) => line === '\n' || arr.indexOf(line) === index)
    .join('\n')
);

function parseHtml(content: string) {
  const metaRegex = /<!-- ([^:]+): (.*?) -->/g;
  const metaMatch = Array.from(content.matchAll(metaRegex));
  const meta: Record<string, string> = {};
  for (const match of metaMatch) {
    meta[match[1]] = match[2];
  }
  return { meta, code: content.replace(/<!--.*?-->/g, '').trim() };
}

function componentTemplate(name: string, slug: string, code: string) {
  return `
@Component({
  selector: '${slug}-route',
  standalone: true,
  imports: [${name}],
  template: \`${code}\`,
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

function directiveTemplate(name: string, slug: string, code: string) {
  return `/**
@generated: ${new Date().toISOString()}
*/
import { Component } from '@angular/core';
import { ${name}Directive } from '../../../../../projects/ui/src/lib/${slug}/${slug}.directive';

@Component({
  selector: '${slug}-route',
  imports: [${name}Directive],
  template: \`${code}\`,
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
