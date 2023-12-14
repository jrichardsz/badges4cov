const path = require('path');
const fs = require('fs');
const CoverageMetricsReader = require("./CoverageMetricsReader.js");
const BadgeRender = require("./BadgeRender.js");

function CoverageBadgesGenerator() {

  this.perform = async (args) => {
    var coverageMetricsReader = new CoverageMetricsReader();
    if (args.source !== "nyc_json") {
      throw Error("source not supported yet: " + args.source);
    }

    var defaultMetrics = await coverageMetricsReader.getDefaultsFromNycJsonSummary(args.nyc_json_file_location);
    console.log("detected coverage metrics")
    console.log(defaultMetrics);
    var badgeRender = new BadgeRender();

    await fs.promises.mkdir(path.join(process.cwd(), args.output_folder), { recursive: true });
    if(args.coverage_type){
      if(typeof defaultMetrics[args.coverage_type] === 'undefined'){
        throw Error("entered coverage_type don't exist on the provided json: "+args.coverage_type)
      }
      var outputLocation = path.join(process.cwd(), args.output_folder, args.coverage_type + ".svg")
      console.log("created badge: "+outputLocation);
      await badgeRender.render("Coverage:" + args.coverage_type, defaultMetrics[args.coverage_type], outputLocation);
    }else{
      for (var coverageType in defaultMetrics) {
        var outputLocation = path.join(process.cwd(), args.output_folder, coverageType + ".svg")
        console.log("created badge: "+outputLocation);
        await badgeRender.render("Coverage:" + coverageType, defaultMetrics[coverageType], outputLocation);
      }
    }
  };
}

module.exports = CoverageBadgesGenerator;
