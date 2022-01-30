var chai = require('chai');
var path = require('path');
var fs = require('fs');
var os = require('os');
var expect = chai.expect;
var assert = chai.assert;
const CoverageBadgesGenerator = require("../main/CoverageBadgesGenerator.js");

describe('CoverageBadgesGenerator', function() {
  it('should fail on unkown source', async function() {
    coverageBadgesGenerator = new CoverageBadgesGenerator();
    var ex;
    try {
      await coverageBadgesGenerator.perform({
        source: "foo"
      });
    } catch (e) {
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
  it('should throw an error on unkown coverage_type', async function() {
    coverageBadgesGenerator = new CoverageBadgesGenerator();
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
  it('should generate the standard four badges', async function() {
    coverageBadgesGenerator = new CoverageBadgesGenerator();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var outputFolder = path.join(os.tmpdir(), (new Date()).getTime().toString(36));

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    await coverageBadgesGenerator.perform({
      source: "nyc_json",
      nyc_json_file_location: jsonFilePath,
      output_folder: outputFolder
    });
    expect(fs.existsSync(path.join(outputFolder, "lines.svg")), "lines.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "statements.svg")), "statements.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "branches.svg")), "branches.svg should exist").to.be.true
    expect(fs.existsSync(path.join(outputFolder, "functions.svg")), "functions.svg should exist").to.be.true
  });
  it('should generate only 01 badge', async function() {
    coverageBadgesGenerator = new CoverageBadgesGenerator();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var outputFolder = path.join(os.tmpdir(), (new Date()).getTime().toString(36));

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
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
  });
});
