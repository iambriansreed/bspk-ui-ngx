/** @file All scripts related to pre-build steps */

import { generateComponentRoutes } from './generate-component-routes';
import { updatePublicApi } from './update-public-api';

generateComponentRoutes();

updatePublicApi();
