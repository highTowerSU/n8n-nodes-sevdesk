const { SevDesk } = require('./dist/nodes/SevDesk/SevDesk.node');
const { SevDeskApi } = require('./dist/credentials/SevDeskApi.credentials');

module.exports = {
  nodes: [SevDesk],
  credentials: [SevDeskApi],
};
