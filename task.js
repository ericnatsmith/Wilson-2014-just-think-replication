/* global $z, $, setTimeout, clearTimeout, innerStream, _, log, urlParams, location, Base64 */

var wait = function(msec, fn) {
  setTimeout(fn, msec);
};

var conditionSet = "missing"; // make global variable until overwritten
var instructionCount = 1; // Set the initial instruction page
var instructionPart = "instructions"; // Set the instruction prefix to start

var nextInstruction = function(){ // get next slide
  instructionCount++; // add instruction count
  $z.showSlide(instructionPart + instructionCount); // show slide
};

var randomize = function(){ // randomize to condition
  var x = Math.floor((Math.random() * 2)); // flip a coin
  if(x == 0) { // If tails, set condition and instruction prefix
    conditionSet = "think";
    instructionPart = "inst-think";
  } else { // If heads, set condition and instruction prefix
    conditionSet = "active";
    instructionPart = "inst-active";
  }
  instructionCount = 1; // reset instruction count
  console.log(instructionPart); // check
  console.log(instructionCount); // check
  $z.showSlide(instructionPart + instructionCount); // and show slides
};

var startFreePeriod = function(){
  $z.showSlide("free-period"); // show free period
  wait(10000, function(){
    $z.showSlide("questions1") // wait X milliseconds then go onto next questions
  } 
  wait(10000, function(){
    $z.showSlide("questions1") // wait X milliseconds then go onto next questions
  } 
)};

$z.showSlide("instructions1"); // This is where the task starts
//$z.showSlide("question1");
//$z.showSlide("cog-task");
//$z.showSlide("sc-task");

// TODO: 
// [ ] fix up launcher javascript to be more precise
// [ ] replace next with gt gt
