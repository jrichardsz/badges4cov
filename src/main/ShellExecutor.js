#!/usr/bin/env node
const args = require('args-parser')(process.argv);
const CoverageBadgesGenerator = require("./CoverageBadgesGenerator.js");
coverageBadgesGenerator = new CoverageBadgesGenerator();
(async () => {
  await coverageBadgesGenerator.perform(args)
})();
