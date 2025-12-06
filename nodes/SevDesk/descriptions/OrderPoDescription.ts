import { INodeProperties } from 'n8n-workflow';

export const orderPoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['orderPo'],
			},
		},
		options: [
			// ----------------------------------------
			//              orderPo: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve order positions depending on the filters defined in the query',
				action: 'Get many order positions',
				routing: {
					request: {
						method: 'GET',
						url: '=/OrderPos',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'objects',
								},
							},
						],
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const orderPoFields: INodeProperties[] = [
	// ----------------------------------------
	//              orderPo: getMany
	// ----------------------------------------
	{
		displayName: 'Order ID',
		name: 'orderId',
		description: 'Retrieve all order positions belonging to this order. Will set order[ID] and order[objectName].',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['orderPo'],
				operation: ['getMany'],
			},
		},
		// Wie bei VoucherPo: komplette URL inkl. Objekt-Name
		routing: {
			request: {
				url: '=/OrderPos?order[id]={{$value}}&order[objectName]=Order',
			},
		},
	},
];
