import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class sevdesk implements INodeType {
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
    description: INodeTypeDescription;
}
