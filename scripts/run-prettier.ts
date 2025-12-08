import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import prettier from 'prettier';
import prettierConfig from '../.prettierrc';

async function formatFiles(checkOnly: boolean) {
        const files = await fg(['nodes/**/*.{ts,json}', 'credentials/**/*.{ts,json}'], { dot: true });
        let hasDifferences = false;

        for (const file of files) {
                const fileInfo = await prettier.getFileInfo(file);
                if (fileInfo.ignored || !fileInfo.inferredParser) continue;

                const filePath = path.resolve(file);
                const input = await fs.readFile(filePath, 'utf8');
                const output = await prettier.format(input, {
                        ...prettierConfig,
                        filepath: filePath,
                });

                if (input !== output) {
                        if (checkOnly) {
                                console.error(`File is not formatted: ${file}`);
                                hasDifferences = true;
                        } else {
                                await fs.writeFile(filePath, output, 'utf8');
                        }
                }
        }

        if (checkOnly && hasDifferences) {
                        process.exitCode = 1;
        }
}

const checkFlag = process.argv.includes('--check');

formatFiles(checkFlag).catch((error) => {
        console.error(error);
        process.exit(1);
});
