import { expect, assert } from 'chai';
import path from 'path';
import os from 'os';
import fs from 'fs';


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
    await import("../main/ShellExecutor.js");
  });
});
