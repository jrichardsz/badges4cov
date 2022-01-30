var Badge = require('badgs')
var fs = require('fs')
const fsPromises = fs.promises;

function BadgeRender() {

  this.percentageToColor = (pct) => {
    var COLOR_MAP = {
      'low': 'red',
      'medium': 'yellow',
      'high': 'brightgreen'
    }

    var color
    if (pct < 50) color = COLOR_MAP.low
    else if (pct < 85) color = COLOR_MAP.medium
    else color = COLOR_MAP.high

    return color
  }

  this.render = async (alias, pct, outputLocation) => {
    if(pct<0 || pct>100){
      throw Error("pct should be greater than zero an less than 100")
    }
    var badge = new Badge()
    var color = this.percentageToColor(pct)
    var rendered = badge.render(alias, pct + '%', color)
    return await fsPromises.writeFile(outputLocation, rendered)
  };

}

module.exports = BadgeRender;
