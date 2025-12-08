"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sevdesk_node_1 = require("./sevdesk.node");
test('smoke', () => {
    const node = new sevdesk_node_1.sevdesk();
    expect(node.description.properties).toBeDefined();
});
//# sourceMappingURL=sevdesk.spec.js.map