import type { ESLint } from 'eslint';

const config: ESLint.ConfigData = {
        extends: ['./.eslintrc.ts'],

        overrides: [
                {
                        files: ['package.json'],
                        plugins: ['eslint-plugin-n8n-nodes-base'],
                        rules: {
                                'n8n-nodes-base/community-package-json-name-still-default': 'error',
                        },
                },
        ],
};

export default config;
