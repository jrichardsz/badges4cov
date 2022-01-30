var chai = require('chai');
var path = require('path');
var os = require('os');
var fs = require('fs');
var expect = chai.expect;
var assert = chai.assert;
const BadgeRender = require("../main/BadgeRender.js");

describe('BadgeRender: percentageToColor', function() {
  it('should return red if pct is less than 50', async function() {
    var badgeRender = new BadgeRender();
    var color = await badgeRender.percentageToColor(49);
    expect(color).to.eql("red");
  });
  it('should return yellow if pct is less than 84', async function() {
    var badgeRender = new BadgeRender();
    var color = await badgeRender.percentageToColor(84);
    expect(color).to.eql("yellow");
  });
  it('should return brightgreen if pct is less than 99', async function() {
    var badgeRender = new BadgeRender();
    var color = await badgeRender.percentageToColor(99);
    expect(color).to.eql("brightgreen");
  });
});
describe('BadgeRender: render', function() {
  it('file should exist if (alias, pct, outputLocation) are correct', async function() {
    var badgeRender = new BadgeRender();
    var outputLocation = path.join(os.tmpdir(), (new Date()).getTime().toString(36)+".svg")
    await badgeRender.render("Coverage:lines", 49, outputLocation);
    expect(fs.existsSync(outputLocation)).to.be.true
  });
  it('should throw an error when pct is wrong', async function() {
    var badgeRender = new BadgeRender();
    var outputLocation = path.join(os.tmpdir(), (new Date()).getTime().toString(36)+".svg")
    var ex;
    try{
      await badgeRender.render("bar", -1, "foo");
    }catch(e){
      ex = e;
    };
    expect(ex !== undefined, "exception was expected").to.eql(true);
  });
});
