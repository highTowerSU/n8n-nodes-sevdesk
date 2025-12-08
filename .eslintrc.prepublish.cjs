const config = {
        extends: ['./.eslintrc.cjs'],

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

module.exports = config;
