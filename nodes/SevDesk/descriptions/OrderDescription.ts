import { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['order'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an order by ID',
				action: 'Get an order',
				routing: {
					request: {
						method: 'GET',
						url: '=/Order/{{$parameter.orderId}}',
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
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve orders with optional filters (status, contact, date range, order number…)',
				action: 'Get many orders',
				routing: {
					request: {
						method: 'GET',
						url: '=/Order',
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
			{
				name: 'Get Pdf',
				value: 'orderGetPdf',
				description: 'Retrieves the PDF document of an order with metadata (filename, mimeType, content…)',
				action: 'Get pdf of an order',
				routing: {
					request: {
						method: 'GET',
						url: '=/Order/{{$parameter.orderId}}/getPdf',
					},
				},
			},
			{
				name: 'Mark As Sent',
				value: 'sendBy',
				description: 'Marks an order as sent by a chosen send type (print, mail, postal, PDF…)',
				action: 'Mark order as sent',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Order/{{$parameter.orderId}}/sendBy',
					},
				},
			},
			{
				name: 'Send via Email',
				value: 'sendViaEmail',
				description:
					'Sends the specified order to a customer via email. Order will be marked as sent.',
				action: 'Send order via email',
				routing: {
					request: {
						method: 'POST',
						url: '=/Order/{{$parameter.orderId}}/sendViaEmail',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const orderFields: INodeProperties[] = [
	// ----------------------------------------
	//              order: common ID
	// ----------------------------------------
	{
		displayName: 'Order ID',
		name: 'orderId',
		description: 'ID of the order',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['get', 'orderGetPdf', 'sendViaEmail', 'sendBy'],
			},
		},
	},

	// ----------------------------------------
	//              order: getMany (filters)
	// ----------------------------------------
	{
		displayName: 'Additional Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		description: 'There are various parameters which can be used to filter orders (status, dates, contact…)',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				description: 'Retrieve all orders for this contact. Will set contact[ID] and contact[objectName].',
				type: 'number',
				default: 0,
				routing: {
					request: {
						// komplette URL, damit contact[objectName] korrekt gesetzt wird
						url: '=/Order?contact[id]={{$value}}&contact[objectName]=Contact',
					},
				},
			},
			{
				displayName: 'Order Number',
				name: 'orderNumber',
				description: 'Retrieve all orders with this order number',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'orderNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				description: 'Retrieve all orders with a date equal or greater than this value',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'startDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				description: 'Retrieve all orders with a date equal or lower than this value',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'endDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the order (see sevDesk docs for the meaning of the codes)',
				type: 'options',
				default: '',
				options: [
					{
						name: 'Any',
						value: '',
					},
					{
						name: 'Status 100',
						value: 100,
					},
					{
						name: 'Status 1000',
						value: 1000,
					},
					{
						name: 'Status 200',
						value: 200,
					},
					{
						name: 'Status 300',
						value: 300,
					},
					{
						name: 'Status 500',
						value: 500,
					},
					{
						name: 'Status 750',
						value: 750,
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'status',
						value: '={{$value || undefined}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//              order: getPdf
	// ----------------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['orderGetPdf'],
			},
		},
		options: [
			{
				displayName: 'Download',
				name: 'download',
				type: 'boolean',
				default: false,
				description: 'Whether sevDesk will treat the pdf as downloaded (sendType VPDF)',
				routing: {
					send: {
						type: 'query',
						property: 'download',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Prevent SendBy',
				name: 'preventSendBy',
				type: 'boolean',
				default: false,
				description: 'Whether prevents automatic marking as sent when retrieving the pdf',
				routing: {
					send: {
						type: 'query',
						property: 'preventSendBy',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//              order: sendViaEmail
	// ----------------------------------------
	{
		displayName: 'To Email',
		name: 'toEmail',
		type: 'string',
		default: '',
		required: true,
		description: 'Recipient email address',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['sendViaEmail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'toEmail',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		required: true,
		description: 'Subject of the email',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['sendViaEmail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'subject',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		description: 'Body of the email. Can contain HTML.',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['sendViaEmail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'emailAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['sendViaEmail'],
			},
		},
		options: [
			{
				displayName: 'Copy to Myself',
				name: 'copy',
				type: 'boolean',
				default: false,
				description: 'Whether a copy of this email will be sent to your sevDesk account address',
				routing: {
					send: {
						type: 'body',
						property: 'copy',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'CC Email',
				name: 'ccEmail',
				type: 'string',
				default: '',
				description: 'Comma-separated list of addresses to be put as CC (e.g. \'a@test.de,b@test.de\')',
				routing: {
					send: {
						type: 'body',
						property: 'ccEmail',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'BCC Email',
				name: 'bccEmail',
				type: 'string',
				default: '',
				description: 'Comma-separated list of addresses to be put as BCC (e.g. \'a@test.de,b@test.de\')',
				routing: {
					send: {
						type: 'body',
						property: 'bccEmail',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Additional Attachments',
				name: 'additionalAttachments',
				type: 'string',
				default: '',
				description: 'IDs of additional documents from the sevDesk account, separated by commas',
				routing: {
					send: {
						type: 'body',
						property: 'additionalAttachments',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//              order: sendBy
	// ----------------------------------------
	{
		displayName: 'Send Type',
		name: 'sendType',
		type: 'options',
		default: 'VPR',
		required: true,
		description:
			"Specifies the way in which the order was sent. 'VPR' (print), 'VP' (postal), 'VM' (mail), 'VPDF' (downloaded pdf).",
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['sendBy'],
			},
		},
		options: [
			{
				name: 'Print (VPR)',
				value: 'VPR',
			},
			{
				name: 'Postal (VP)',
				value: 'VP',
			},
			{
				name: 'Mail (VM)',
				value: 'VM',
			},
			{
				name: 'Downloaded PDF (VPDF)',
				value: 'VPDF',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'sendType',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Send Draft',
		name: 'sendDraft',
		type: 'boolean',
		default: false,
		required: true,
		description:
			'Whether only a draft of the order will be created for internal use. Status of the order will not be changed.',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['sendBy'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'sendDraft',
				value: '={{$value}}',
			},
		},
	},
];