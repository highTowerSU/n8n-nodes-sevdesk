import { INodeProperties } from 'n8n-workflow';

export const contactAddressOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
			},
		},
		options: [
			// ----------------------------------------
			//      contactAddress: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Retrieve contact addresses with optional filters.',
				action: 'Get many contact addresses',
				routing: {
					request: {
						method: 'GET',
						url: '/ContactAddress',
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

			// ----------------------------------------
			//      contactAddress: get
			// ----------------------------------------
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a contact address by ID.',
				action: 'Get a contact address',
				routing: {
					request: {
						method: 'GET',
						url: '=/ContactAddress/{{$parameter.contactAddressId}}',
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

			// ----------------------------------------
			//      contactAddress: create
			// ----------------------------------------
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contact address.',
				action: 'Create a contact address',
				routing: {
					request: {
						method: 'POST',
						url: '/ContactAddress',
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

			// ----------------------------------------
			//      contactAddress: update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing contact address.',
				action: 'Update a contact address',
				routing: {
					request: {
						method: 'PUT',
						url: '=/ContactAddress/{{$parameter.contactAddressId}}',
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

			// ----------------------------------------
			//      contactAddress: delete
			// ----------------------------------------
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact address by ID.',
				action: 'Delete a contact address',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/ContactAddress/{{$parameter.contactAddressId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const contactAddressFields: INodeProperties[] = [
	// ----------------------------------------
	//      contactAddress: common ID
	// ----------------------------------------
	{
		displayName: 'Contact Address ID',
		name: 'contactAddressId',
		description: 'ID of the contact address.',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------------
	//      contactAddress: getMany (filters)
	// ----------------------------------------
	{
		displayName: 'Additional Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		description:
			'Filter contact addresses e.g. by contact, country, category or city.',
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				default: 0,
				description:
					'Retrieve all contact addresses belonging to this contact.',
				// wie bei Invoice: ganze URL inkl. objectName
				routing: {
					request: {
						url:
							'=/ContactAddress?contact[id]={{$value}}&contact[objectName]=Contact',
					},
				},
			},
			{
				displayName: 'Country ID',
				name: 'countryId',
				type: 'number',
				default: 0,
				description:
					'Retrieve all contact addresses with this country (country[id]).',
				routing: {
					send: {
						type: 'query',
						property: 'country[id]',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'number',
				default: 0,
				description:
					'Retrieve all contact addresses with this category (category[id]).',
				routing: {
					send: {
						type: 'query',
						property: 'category[id]',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Filter by city name.',
				routing: {
					send: {
						type: 'query',
						property: 'city',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'ZIP',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'Filter by ZIP code.',
				routing: {
					send: {
						type: 'query',
						property: 'zip',
						value: '={{$value || undefined}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//      contactAddress: create
	// ----------------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'number',
		default: 0,
		required: true,
		description: 'The contact this address belongs to.',
		hint: 'Get contacts with the sevDesk node. Contact -> Get Many',
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'contact',
				value: '={{ { "id": $value, "objectName": "Contact" } }}',
			},
		},
	},
	{
		displayName: 'Country ID',
		name: 'countryId',
		type: 'number',
		default: 0,
		required: true,
		description: 'The country of the address.',
		hint: 'Get countries with the sevDesk node. Country -> Get Many',
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'country',
				value: '={{ { "id": $value, "objectName": "Country" } }}',
			},
		},
	},
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'number',
		default: 0,
		required: true,
		description:
			'Category of the contact address. Use /Category?objectType=ContactAddress.',
		hint: 'Get categories with the sevDesk node. Category -> Get Many',
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'category',
				value: '={{ { "id": $value, "objectName": "Category" } }}',
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
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description:
					'Name of the address (e.g. delivery address, headquarters…).',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Name 2',
				name: 'name2',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name2',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Name 3',
				name: 'name3',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name3',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Name 4',
				name: 'name4',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name4',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				description: 'Street and house number.',
				routing: {
					send: {
						type: 'body',
						property: 'street',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'ZIP',
				name: 'zip',
				type: 'string',
				default: '',
				description: 'ZIP code.',
				routing: {
					send: {
						type: 'body',
						property: 'zip',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City.',
				routing: {
					send: {
						type: 'body',
						property: 'city',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//      contactAddress: update
	// ----------------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				default: 0,
				description: 'Change the contact this address belongs to.',
				routing: {
					send: {
						type: 'body',
						property: 'contact',
						value: '={{ { "id": $value, "objectName": "Contact" } }}',
					},
				},
			},
			{
				displayName: 'Country ID',
				name: 'countryId',
				type: 'number',
				default: 0,
				description: 'Change the country of the address.',
				routing: {
					send: {
						type: 'body',
						property: 'country',
						value: '={{ { "id": $value, "objectName": "Country" } }}',
					},
				},
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'number',
				default: 0,
				description: 'Change the category of the address.',
				routing: {
					send: {
						type: 'body',
						property: 'category',
						value: '={{ { "id": $value, "objectName": "Category" } }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Name 2',
				name: 'name2',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name2',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Name 3',
				name: 'name3',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name3',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Name 4',
				name: 'name4',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name4',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'street',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'ZIP',
				name: 'zip',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'zip',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'city',
						value: '={{$value}}',
					},
				},
			},
		],
	},
];
