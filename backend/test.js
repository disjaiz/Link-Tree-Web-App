// test.js (use ES Module format)

import path from 'path';
import { fileURLToPath } from 'url';

// Simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__filename:', __filename);
console.log('__dirname:', __dirname);


