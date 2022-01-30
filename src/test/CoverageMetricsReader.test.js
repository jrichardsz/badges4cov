var chai = require('chai');
var path = require('path');
var expect = chai.expect;
var assert = chai.assert;
const CoverageMetricsReader = require("../main/CoverageMetricsReader.js");

describe('CoverageMetricsReader: getDefaultsFromNycJsonSummary', function() {
  it('should get defaults from valid nyc json summary', async function() {
    var coverageMetricsReader = new CoverageMetricsReader();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var defaultMetrics = await coverageMetricsReader.getDefaultsFromNycJsonSummary(jsonFilePath);
    expect(defaultMetrics.lines).to.eql(66.66);
    expect(defaultMetrics.statements).to.eql(65.9);
    expect(defaultMetrics.functions).to.eql(80);
    expect(defaultMetrics.branches).to.eql(62.5);
  });
  it('should throw exception when nyc json summary is wrong : missing lines', async function() {
    var coverageMetricsReader = new CoverageMetricsReader();
    var ex;
    try{
      var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "wrong-coverage-summary-missing-lines.json");
      await coverageMetricsReader.getDefaultsFromNycJsonSummary(jsonFilePath);
    }catch(e){
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
  it('should throw exception when nyc json summary is wrong : missing statements', async function() {
    var coverageMetricsReader = new CoverageMetricsReader();
    var ex;
    try{
      var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "wrong-coverage-summary-missing-statements.json");
      await coverageMetricsReader.getDefaultsFromNycJsonSummary(jsonFilePath);
    }catch(e){
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
  it('should throw exception when nyc json summary is wrong : missing functions', async function() {
    var coverageMetricsReader = new CoverageMetricsReader();
    var ex;
    try{
      var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "wrong-coverage-summary-missing-functions.json");
      await coverageMetricsReader.getDefaultsFromNycJsonSummary(jsonFilePath);
    }catch(e){
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
  it('should throw exception when nyc json summary is wrong : missing branches', async function() {
    var coverageMetricsReader = new CoverageMetricsReader();
    var ex;
    try{
      var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "wrong-coverage-summary-missing-branches.json");
      await coverageMetricsReader.getDefaultsFromNycJsonSummary(jsonFilePath);
    }catch(e){
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
});

describe('CoverageMetricsReader: getSingleFromNycJsonSummaryByCoverageTypeAndMetric', function() {
  it('should get single coverage from valid nyc json summary', async function() {
    var coverageMetricsReader = new CoverageMetricsReader();
    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    var pct = await coverageMetricsReader.getSingleFromNycJsonSummaryByCoverageTypeAndMetric(jsonFilePath, "lines", "pct");
    expect(pct[0]).to.eql(66.66);
  });
});
