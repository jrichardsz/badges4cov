#!/usr/bin/env node
import argsParser from 'args-parser';
import CoverageBadgesGenerator from "./CoverageBadgesGenerator.js";
const args = argsParser(process.argv);

const coverageBadgesGenerator = new CoverageBadgesGenerator();
(async () => {
  await coverageBadgesGenerator.perform(args)
})();
