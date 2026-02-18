/**
 * This script generates metadata for all components, including:
 *
 * - API documentation (inputs/outputs)
 * - Example routes
 * - Component overview pages
 *
 * It relies on Compodoc for parsing the source code and generating documentation in JSON format, which is then
 * processed to extract the relevant metadata for each component. The generated metadata is used to create example
 * routes and overview pages for each component in the documentation site.
 *
 * To run this script, use the following command:
 *
 * $ npm run meta
 *
 * If you want to force regeneration of the Compodoc documentation, you can run:
 *
 * $ npm run meta f
 */

import { execSync } from 'child_process';

const args = process.argv.splice(2);

execSync(`npx tsx .scripts/meta/pre.ts --write ${args.join(' ')}`, { stdio: 'inherit' });

execSync(`npx tsx .scripts/meta/main.ts --write ${args.join(' ')}`, { stdio: 'inherit' });
