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
  $(document).scrollTop(0);// go to top of page
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
  $(document).scrollTop(0);// go to top of page
};

var hideHiddenEnable = function(id){
  $(".hideToShow").hide();
  $("#" + id).removeAttr("disabled");
}

var showHiddenDisable = function(id){
  $(".hideToShow").show();
  $("#" + id).attr("disabled",true);
}

var startFreePeriod = function(){
  $z.showSlide("free-period"); // show free period
  wait(2000, function(){
    showHiddenDisable(" "); // wait X to enable button
  }) 
  wait(15000, function(){
    startQuestions(); // wait X milliseconds then go onto next questions automatically
  })
  $(document).scrollTop(0);// go to top of page
};

var startQuestions = function() {
  if(instructionPart != "questions") { // ensures only runs once
    instructionPart = "questions"; // change instruction part
    instructionCount = 1; // add instruction count
    $z.showSlide(instructionPart + instructionCount); // show the start of the questions
    $(document).scrollTop(0);// go to top of page
  }
};

var endExperiment = function() {
  $z.showSlide("thank-you"); // show the start of the questions
  experiment.end();
  // wait(3000, function(){
  //   closeWindow();
  // });
  // wait(3500, function(){
  //   window.opener.done();
  // }); // wait X milliseconds then go onto next questions automatically
};

var closeWindow = function() {
  //window.opener.done();
  //window.opener=self;
  window.close();
}

// Submitting data

var experiment = {
  // Parameters for this sequence.
  trials: "hello",
  // Experiment-specific parameters - which keys map to odd/even
  keyBindings: "temp",
  // An array to store the data that we're collecting.
  allData: [],
  // The function that gets called when the sequence is finished.
  end: function() {
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    setTimeout(function() { turk.submit(experiment) }, 500);
  },
  radio: function(questionIDs) {
    $.each(questionIDs, function(index,value) {
      data = {
        question: value,
        answer: $("input:radio[name="+value+"]:checked").val()
      };
      experiment.allData.push(data);
    });
  },
  open: function(questionID) {
    data = {
      question: questionID,
      answer: $("#"+questionID).val()
    };
    experiment.allData.push(data);
  },
  getTime: function(pageID) {
    recordTime = new Date(); // record the newest time
    diffTime = recordTime - lastTime; // record the difference from last time
    data = {
      question: "time_"+pageID,
      answer: diffTime
    };
    lastTime = recordTime; // replace the last time

    experiment.allData.push(data);
  },
  recordCond: function(condition) {
    data = {
      question: "condition",
      answer: condition
    };
  }
}

var lastTime = new Date();


//$z.showSlide("questions5"); // for testing
$z.showSlide("instructions1"); // This is where the task starts
//$z.showSlide("question1");
//$z.showSlide("cog-task");
//$z.showSlide("sc-task");

// TODO: 
// [ ] fix up launcher javascript to be more precise
// [ ] replace next with gt gt


