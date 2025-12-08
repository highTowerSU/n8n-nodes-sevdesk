import { INodeProperties } from 'n8n-workflow';

export const voucherOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['voucher'],
			},
		},
		options: [
			{
				name: 'Book',
				value: 'bookVoucher',
				description: 'Books a voucher on a check account with optional check account transaction',
				action: 'Book a voucher',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Voucher/{{$parameter.voucherId}}/bookAmount',
					},
				},
			},
			{
				name: 'Create or Update',
				value: 'createByFactory',
				description: 'Create or update a voucher with positions via the factory endpoint',
				action: 'Create or update a voucher',
				routing: {
					request: {
						method: 'POST',
						url: '=/Voucher/Factory/saveVoucher',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'voucher',
								},
							},
						],
					},
				},
			},
			{
				name: 'Enshrine',
				value: 'enshrine',
				description:
					'Sets the current date/time as `enshrined`. Enshrined vouchers cannot be changed.',
				action: 'Enshrine a voucher',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Voucher/{{$parameter.voucherId}}/enshrine',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a voucher by ID',
				action: 'Get a voucher',
				routing: {
					request: {
						method: 'GET',
						url: '=/Voucher/{{$parameter.voucherId}}',
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
				description: 'Retrieve vouchers with optional filters',
				action: 'Get many vouchers',
				routing: {
					request: {
						method: 'GET',
						url: '/Voucher',
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
				name: 'Reset to Draft',
				value: 'resetToDraft',
				description:
					'Resets the voucher status back to "Draft" (50). Only possible from "Open" (100).',
				action: 'Reset voucher to draft',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Voucher/{{$parameter.voucherId}}/resetToDraft',
					},
				},
			},
			{
				name: 'Reset to Open',
				value: 'resetToOpen',
				description:
					'Resets the voucher status back to "Open" (100). Linked payments will be unlinked.',
				action: 'Reset voucher to open',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Voucher/{{$parameter.voucherId}}/resetToOpen',
					},
				},
			},
			{
				name: 'Upload Temp File',
				value: 'uploadTempFile',
				description: 'Upload a temporary file that can later be attached to a voucher',
				action: 'Upload temp file for voucher',
				routing: {
					request: {
						method: 'POST',
						url: '/Voucher/Factory/uploadTempFile',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const voucherFields: INodeProperties[] = [
	// ----------------------------------------
	//              voucher: common id
	// ----------------------------------------
	{
		displayName: 'Voucher ID',
		name: 'voucherId',
		description: 'ID of the voucher',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['bookVoucher', 'get', 'enshrine', 'resetToOpen', 'resetToDraft'],
			},
		},
	},

	// ----------------------------------------
	//              voucher: book
	// ----------------------------------------
	{
		displayName: 'Amount',
		name: 'amount',
		description: 'Amount which should be booked. Can also be a partial amount.',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['bookVoucher'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'amount',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Booking Date',
		name: 'date',
		description: 'The booking date. Most likely the current date.',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['bookVoucher'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'date',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Booking Type',
		name: 'type',
		description: 'Define a type for the booking. The following type abbreviations are available (abbreviation &lt;-&gt; meaning).',
		type: 'options',
		default: 'FULL_PAYMENT',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['bookVoucher'],
			},
		},
		options: [
			{
				name: 'Higher Amount Due to Reminder Charges',
				value: 'OF',
			},
			{
				name: 'Normal Booking (Full Payment)',
				value: 'FULL_PAYMENT',
			},
			{
				name: 'Partial Booking (Historically Normal Booking)',
				value: 'N',
			},
			{
				name: 'Reduced Amount Due to Discount (Skonto)',
				value: 'CB',
			},
			{
				name: 'Reduced Amount Due to the Monetary Traffic Costs',
				value: 'MTC',
			},
			{
				name: 'Reduced/Higher Amount Due to Currency Fluctuations (Deprecated)',
				value: 'CF',
			},
			{
				name: 'Reduced/Higher Amount Due to Other Reasons',
				value: 'O',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'type',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Check Account ID',
		name: 'checkAccountId',
		description: 'The check account on which should be booked',
		hint: 'Get IDs with the sevDesk node. CheckAccount -> Get Many',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['bookVoucher'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'checkAccount',
				value: '={{ { "id": $value, "objectName": "CheckAccount" } }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['bookVoucher'],
			},
		},
		options: [
			{
				displayName: 'Check Account Transaction ID',
				name: 'checkAccountTransactionId',
				type: 'number',
				default: 0,
				hint: 'Get IDs with sevDesk node. CheckAccountTransaction -> Get Many',
				description:
					'The check account transaction on which should be booked. The transaction will be linked to the voucher.',
				routing: {
					send: {
						type: 'body',
						property: 'checkAccountTransaction',
						value: '={{ { "id": $value, "objectName": "CheckAccountTransaction" } }}',
					},
				},
			},
			{
				displayName: 'Create Feed',
				name: 'createFeed',
				type: 'boolean',
				default: false,
				description: 'Whether a feed entry will be created for this booking (if supported by sevDesk)',
				routing: {
					send: {
						type: 'body',
						property: 'createFeed',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//              voucher: createByFactory
	// ----------------------------------------
	{
		displayName: 'Note',
		name: 'note',
		type: 'notice',
		default: 0,
		description: 'Most voucher attributes are optional and nullable, but for a valid voucher you should at least provide supplier, description, voucher date, credit/debit, voucher type, status, currency and mapAll',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
	},
	{
		displayName: 'Supplier ID',
		name: 'supplierId',
		type: 'number',
		default: 0,
		required: true,
		description: 'The contact used in the voucher as supplier',
		hint: 'Get contacts with the sevDesk node. Contacts -> Get Many',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'voucher.supplier',
				propertyInDotNotation: true,
				value: '={{ { "id": $value, "objectName": "Contact" } }}',
			},
		},
	},
	{
		displayName: 'Supplier Name',
		name: 'supplierName',
		type: 'string',
		default: '',
		description: 'The supplier name to be shown if no supplier contact is provided or to override the contact name',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'voucher.supplierName',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		description: 'Description / voucher number',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'voucher.description',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Voucher Date',
		name: 'voucherDate',
		type: 'string',
		default: '',
		required: true,
		description:
			'Timestamp. This can also be a date range if you also use additional date attributes.',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'voucher.voucherDate',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Credit / Debit',
		name: 'creditDebit',
		type: 'options',
		default: 'C',
		required: true,
		description: 'Defines if your voucher is a credit (C) or debit (D)',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				name: 'Credit',
				value: 'C',
			},
			{
				name: 'Debit',
				value: 'D',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'voucher.creditDebit',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Voucher Type',
		name: 'voucherType',
		type: 'options',
		default: 'VOU',
		required: true,
		description: 'Type of the voucher. See sevDesk API docs for the meaning of the codes.',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				name: 'Voucher (VOU)',
				value: 'VOU',
			},
			{
				name: 'Incoming Invoice (RV)',
				value: 'RV',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'voucher.voucherType',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 50,
		required: true,
		description:
			'Status of the voucher. 50 = Draft, 100 = Open, 1000 = Paid. See sevDesk docs for details.',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				name: 'Draft (50)',
				value: 50,
			},
			{
				name: 'Open (100)',
				value: 100,
			},
			{
				name: 'Paid (1000)',
				value: 1000,
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'voucher.status',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: 'EUR',
		required: true,
		description:
			'Currency of the voucher (e.g. EUR). If not equal to the default account currency, foreign currency parameters must be set.',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'voucher.currency',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Map All',
		name: 'mapAll',
		type: 'boolean',
		default: true,
		description:
			'Whether all supplied voucher fields will be mapped. This should usually stay enabled.',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'voucher.mapAll',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				displayName: 'Voucher Positions (JSON)',
				name: 'voucherPosJson',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description:
					'Raw JSON array for `voucherPosSave`. Must match the sevDesk Model_VoucherPos schema.',
				routing: {
					send: {
						type: 'body',
						property: 'voucherPosSave',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Filename (Temp File)',
				name: 'filename',
				type: 'string',
				default: '',
				description: 'Filename of a previously uploaded temp file which should be attached to the voucher',
				routing: {
					send: {
						type: 'body',
						property: 'filename',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//              voucher: getMany (filters)
	// ----------------------------------------
	{
		displayName: 'Additional Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				description: 'Filter vouchers by status',
				options: [
					{
						name: 'Any',
						value: '',
					},
					{
						name: 'Draft (50)',
						value: 50,
					},
					{
						name: 'Open (100)',
						value: 100,
					},
					{
						name: 'Paid (1000)',
						value: 1000,
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
			{
				displayName: 'Credit / Debit',
				name: 'creditDebit',
				type: 'options',
				default: '',
				description: 'Filter vouchers by credit/debit',
				options: [
					{
						name: 'Any',
						value: '',
					},
					{
						name: 'Credit (C)',
						value: 'C',
					},
					{
						name: 'Debit (D)',
						value: 'D',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'creditDebit',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				default: '',
				description: 'Retrieve all vouchers with a date equal or greater than this value',
				routing: {
					send: {
						type: 'query',
						property: 'startDate',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				default: '',
				description: 'Retrieve all vouchers with a date equal or lower than this value',
				routing: {
					send: {
						type: 'query',
						property: 'endDate',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				default: 0,
				description:
					'Retrieve all vouchers with this contact as supplier. Must be provided with contact[objectName].',
				routing: {
					send: {
						type: 'query',
						property: 'contact[id]',
						value: '={{$value || undefined}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//              voucher: uploadTempFile
	// ----------------------------------------
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the file to upload as temp file',
		displayOptions: {
			show: {
				resource: ['voucher'],
				operation: ['uploadTempFile'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'filename',
				value: '={{$value}}',
			},
		},
	},
];
