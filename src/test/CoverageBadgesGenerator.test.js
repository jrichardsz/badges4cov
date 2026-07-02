import { expect, assert } from 'chai';
import path from 'path';
import fs from 'fs';

import CoverageBadgesGenerator from "../main/CoverageBadgesGenerator.js";

describe('CoverageBadgesGenerator', function() {
  it('should fail on unkown source', async function() {
    const coverageBadgesGenerator = new CoverageBadgesGenerator();
    var ex;
    try {
      await coverageBadgesGenerator.perform({
        source: "foo"
      });
    } catch (e) {
      ex = e;
      console.log(e);
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });

  it('should throw an error on missing output_folder', async function() {
    const coverageBadgesGenerator = new CoverageBadgesGenerator();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var ex;
    try {
      await coverageBadgesGenerator.perform({
        source: "nyc_json",
        coverage_type: "statementss",
        nyc_json_file_location: jsonFilePath
      });
    } catch (e) {
      console.log(e);
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });

  it('should throw an error on unkown coverage_type', async function() {
    const coverageBadgesGenerator = new CoverageBadgesGenerator();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var ex;
    try {
      await coverageBadgesGenerator.perform({
        source: "nyc_json",
        coverage_type: "statementss",
        nyc_json_file_location: jsonFilePath,
        output_folder: "foo"
      });
    } catch (e) {
      console.log(e);
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
  it('should generate the standard four badges', async function() {
    const coverageBadgesGenerator = new CoverageBadgesGenerator();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var outputFolder = (new Date()).getTime().toString(36);

    await coverageBadgesGenerator.perform({
      source: "nyc_json",
      nyc_json_file_location: jsonFilePath,
      output_folder: outputFolder
    });
    expect(fs.existsSync(path.join(outputFolder, "lines.svg")), "lines.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "statements.svg")), "statements.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "branches.svg")), "branches.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "functions.svg")), "functions.svg should exist").to.be.true

    await fs.promises.rm(path.join(process.cwd(), outputFolder), { recursive: true });
  });
  it('should generate only 01 badge', async function() {
    const coverageBadgesGenerator = new CoverageBadgesGenerator();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var outputFolder = (new Date()).getTime().toString(36);

    await coverageBadgesGenerator.perform({
      source: "nyc_json",
      nyc_json_file_location: jsonFilePath,
      coverage_type: "statements",
      output_folder: outputFolder
    });
    expect(fs.existsSync(path.join(outputFolder, "statements.svg")), "statements.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "lines.svg")), "lines.svg should not exist").to.be.false
    expect(fs.existsSync(path.join(outputFolder, "branches.svg")), "branches.svg should not exist").to.be.false
    expect(fs.existsSync(path.join(outputFolder, "functions.svg")), "functions.svg should not exist").to.be.false
    
    await fs.promises.rm(path.join(process.cwd(), outputFolder), { recursive: true });
  });
});
