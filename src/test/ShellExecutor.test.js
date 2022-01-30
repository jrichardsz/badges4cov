var chai = require('chai');
var path = require('path');
var os = require('os');
var fs = require('fs');
var expect = chai.expect;
var assert = chai.assert;

describe('ShellExecutor', function() {
  it('should work in the shell', async function() {

    var outputFolder = path.join(os.tmpdir(), (new Date()).getTime().toString(36));
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    var jsonFilePath = path.join(process.env.INIT_CWD, "src", "test", "resources", "nyc_json_summary", "coverage-summary.json");
    process.argv.push('--source=nyc_json');
    process.argv.push(`--nyc_json_file_location=${jsonFilePath}`);
    process.argv.push(`--output_folder=${outputFolder}`);
    //TODO: 04 metrics are detected but internal loop performs ony one iteration :S
    //anyway this test is just for coverage perfection
    //because the core is tested on CoverageBadgesGenerator

    //TODO: strangely --require mocha-suppress-logs is ignored on this execution
    //So there are some ugly lines on the nyc report
    require("../main/ShellExecutor.js");
  });
});
