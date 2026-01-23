/** @file All scripts related to pre-build steps */

import { execSync } from 'child_process';
import fs from 'fs';
import { generateComponentRoutes } from './generate-component-routes';
import { updateIndex } from './update-index';

execSync('npm run compodoc', { stdio: 'inherit' });

// extract all component metadata

function extractComponentMetadata() {
    // Compodoc generates a JSON file named 'documentation.json' in the specified output directory
    const metadataPath = './meta/documentation.json';

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    console.log(metadata.components.map((comp: any) => comp.name));

    // create
}

extractComponentMetadata();

// generateComponentRoutes();

// updateIndex();
