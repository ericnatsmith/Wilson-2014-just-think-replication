/* global $z, $, setTimeout, clearTimeout, innerStream, _, log, urlParams, location, Base64 */

Array.prototype.sum = function() {
  var i = this.length, r = 0;
  while(i--) {
    r += this[i];
  }
  return r;
};

var wait = function(msec, fn) {
  setTimeout(fn, msec);
};

var instructionCount = 1;

var nextInstruction = function(){
  instructionCount++;
  $z.showSlide("instructions" + instructionCount);
};

var taskDelay = function(){
  wait(3000, function(){nextInstruction()}
)};

$z.showSlide("instructions1");
//$z.showSlide("question1");
//$z.showSlide("cog-task");
//$z.showSlide("sc-task");

// TODO: 
// [ ] fix up launcher javascript to be more precise