import { INodeProperties } from 'n8n-workflow';

export const voucherPoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['voucherPo'],
			},
		},
		options: [
			// ----------------------------------------
			//              voucherPo: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				description:
					'Retrieve voucher positions depending on the filters defined in the query.',
				action: 'Get many voucher positions',
				routing: {
					request: {
						method: 'GET',
						url: '=/VoucherPos',
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

export const voucherPoFields: INodeProperties[] = [
	// ----------------------------------------
	//              voucherPo: getMany
	// ----------------------------------------
	{
		displayName: 'Voucher ID',
		name: 'voucherId',
		description:
			'Retrieve all voucher positions belonging to this voucher. Must be provided with Voucher object name.',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['voucherPo'],
				operation: ['getMany'],
			},
		},
		// Wie bei Invoice-Filtern (Contact ID): komplette URL inkl. Objekt-Name
		routing: {
			request: {
				url: '=/VoucherPos?voucher[id]={{$value}}&voucher[objectName]=Voucher',
			},
		},
	},
];
