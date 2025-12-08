const { src, dest, series } = require('gulp');
const path = require('path');

const ICON_SRC = 'src/nodes/sevdesk/logo.svg';
const ICON_DEST = 'dist/nodes/sevdesk';

function buildIcons() {
  return src(ICON_SRC).pipe(dest(ICON_DEST));
}

exports['build:icons'] = buildIcons;
exports.default = series(buildIcons);
