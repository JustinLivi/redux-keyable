// tslint:disable-next-line:no-implicit-dependencies
import { readFile, writeFile } from 'fs-extra';

const TYPES_PATH = './types/index.d.ts';

const run = async () => {
  const body = await readFile(TYPES_PATH);
  const header = Buffer.from('// TypeScript Version: 3.1\n');
  const output = Buffer.concat([header, body]);
  await writeFile(TYPES_PATH, output);
};

run();
