# n8n-nodes-sevDesk

This is an n8n community node that lets you interact with the [sevDesk](https://sevdesk.de/) accounting API from your workflows. Use it to automate contact management, invoicing, orders, and related financial tasks directly in n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Version history](#version-history)

## Installation

Follow the [community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) to add `@ceneos.net/n8n-nodes-sevdesk` to your n8n instance.

## Operations

The sevDesk node exposes the major sevDesk REST resources. Each resource supports create, retrieve, update, delete, and list actions where applicable, plus sevDesk-specific helpers. Available resources include:

- Accounting contacts
- Categories
- Bank accounts and transactions
- Communication ways (email, phone, etc.)
- Contacts and contact addresses (with checks for customer number availability)
- Countries
- Invoices
- Orders and purchase orders
- Parts and units
- Vouchers and voucher purchase orders

Refer to the node properties in n8n for the exact operations and required fields for each resource.

## Credentials

Authentication uses your sevDesk API key, sent as the `Authorization` header for every request.

1. In sevDesk, create or locate your API key.
2. In n8n, create new **sevDesk API** credentials and paste the key.
3. Select the credential in your sevDesk node; the built-in credential test issues a lightweight `GET` request to verify access.

## Compatibility

- Uses n8n Nodes API v1.
- Tested with n8n 1.x releases; other versions may work but are not officially verified.

## Usage

1. Add the **sevDesk** node to your workflow and choose a resource (for example, Contact or Invoice).
2. Select an operation such as **Create**, **Get**, **Get Many**, **Update**, or **Delete**.
3. Provide the required fields shown in the node parameters, including any IDs when updating or retrieving existing records.
4. Execute the workflow to send the request to sevDesk and process the returned data.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [sevDesk API documentation](https://api.sevdesk.de/)

## Version history

- 0.3.3 — Current release with support for sevDesk contacts, addresses, finance documents, vouchers, orders, parts, and related utilities.
