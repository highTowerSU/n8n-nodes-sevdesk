"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sevdesk = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const n8n_openapi_node_1 = require("@devlikeapro/n8n-openapi-node");
const doc = __importStar(require("./openapi.json"));
const config = {};
const parser = new n8n_openapi_node_1.N8NPropertiesBuilder(doc, config);
const properties = parser.build();
class sevdesk {
    constructor() {
        this.description = {
            displayName: 'SevDesk',
            name: 'sevdesk',
            icon: 'file:logo.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with SevDesk API',
            defaults: {
                name: 'SevDesk',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'sevdeskApi',
                    required: true,
                },
            ],
            requestDefaults: {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                baseURL: 'https://my.sevdesk.de/api/v1',
            },
            properties: properties,
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('sevdeskApi');
        for (let i = 0; i < items.length; i++) {
            try {
                let routing;
                try {
                    routing = this.getNodeParameter('__routing', i);
                }
                catch {
                    routing = null;
                }
                let url;
                let method = 'GET';
                let body = undefined;
                let qs = {};
                if (routing && routing.request) {
                    url = routing.request.url || '';
                    method = routing.request.method || 'GET';
                    body = routing.request.body;
                    qs = routing.request.qs || {};
                }
                else {
                    const resource = this.getNodeParameter('resource', i);
                    const operation = this.getNodeParameter('operation', i);
                    console.log('Resource:', resource, 'Operation:', operation);
                    if (resource === 'Invoice') {
                        if (operation === 'Get Invoices' || operation === 'getInvoices' || operation.includes('Invoice')) {
                            url = '/Invoice';
                            qs.limit = 50;
                            qs.offset = 0;
                            try {
                                const status = this.getNodeParameter('status', i, null);
                                if (status)
                                    qs.status = status;
                                const invoiceNumber = this.getNodeParameter('invoiceNumber', i, '');
                                if (invoiceNumber)
                                    qs.invoiceNumber = invoiceNumber;
                                const startDate = this.getNodeParameter('startDate', i, null);
                                if (startDate)
                                    qs.startDate = startDate;
                                const endDate = this.getNodeParameter('endDate', i, null);
                                if (endDate)
                                    qs.endDate = endDate;
                            }
                            catch (e) {
                            }
                        }
                        else {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported Invoice operation: ${operation}`);
                        }
                    }
                    else {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`);
                    }
                }
                const cleanedQs = {};
                for (const [key, value] of Object.entries(qs)) {
                    if (value !== '' && value !== undefined && value !== null) {
                        cleanedQs[key] = value;
                    }
                }
                if (!cleanedQs.limit) {
                    cleanedQs.limit = 50;
                }
                if (!cleanedQs.offset) {
                    cleanedQs.offset = 0;
                }
                const options = {
                    method,
                    url: `https://my.sevdesk.de/api/v1${url}`,
                    headers: {
                        'Authorization': credentials.apiToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    qs: cleanedQs,
                    json: true,
                };
                if (body && method !== 'GET' && method !== 'DELETE') {
                    options.body = body;
                }
                const responseData = await this.helpers.httpRequest(options);
                if (responseData && responseData.objects && Array.isArray(responseData.objects)) {
                    returnData.push(...responseData.objects.map((item) => ({ json: item })));
                }
                else if (Array.isArray(responseData)) {
                    returnData.push(...responseData.map(item => ({ json: item })));
                }
                else {
                    returnData.push({ json: responseData });
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        return [returnData];
    }
}
exports.sevdesk = sevdesk;
//# sourceMappingURL=sevdesk.node.js.map