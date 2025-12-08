"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sevdeskApi = void 0;
class sevdeskApi {
    constructor() {
        this.name = 'sevdeskApi';
        this.displayName = 'SevDesk API';
        this.documentationUrl = 'https://api.sevdesk.de/';
        this.properties = [
            {
                displayName: 'API Token',
                name: 'apiToken',
                type: 'string',
                default: '',
                required: true,
                typeOptions: { password: true },
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{$credentials.apiToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://my.sevdesk.de/api/v1',
                url: '/Contact',
                method: 'GET',
            },
        };
    }
}
exports.sevdeskApi = sevdeskApi;
//# sourceMappingURL=sevdeskApi.credentials.js.map