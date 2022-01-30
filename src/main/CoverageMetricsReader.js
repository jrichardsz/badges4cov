var jp = require('jsonpath');
const fsPromises = require('fs').promises

function CoverageMetricsReader() {


  this.getDefaultsFromNycJsonSummary = async (jsonFilePath) => {
    let string = await fsPromises.readFile(jsonFilePath, 'utf-8');
    var data = JSON.parse(string);

    var lines = jp.query(data, `$.total.lines.pct`)[0];
    if (lines.size==0) throw Error("nyc json summary don't contain the required value: total.lines.pct");
    var statements = jp.query(data, `$.total.statements.pct`)[0];
    if (statements.size==0) throw Error("nyc json summary don't contain the required value: total.statements.pct");
    var functions = jp.query(data, `$.total.functions.pct`)[0];
    if (functions.size==0) throw Error("nyc json summary don't contain the required value: total.functions.pct");
    var branches = jp.query(data, `$.total.branches.pct`)[0];
    if (branches.size==0) throw Error("nyc json summary don't contain the required value: total.branches.pct");

    return {
      lines: lines,
      statements: statements,
      functions: functions,
      branches: branches
    }
  };

  this.getSingleFromNycJsonSummaryByCoverageTypeAndMetric = async (jsonFilePath, coverageType, metric) => {
    let data = await fsPromises.readFile(jsonFilePath, 'utf-8');
    return jp.query(JSON.parse(data), `$.total.${coverageType}.${metric}`);
  };
}


module.exports = CoverageMetricsReader;
