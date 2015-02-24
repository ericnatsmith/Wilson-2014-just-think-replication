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
  experiment.recordCond(conditionSet);
  instructionCount = 1; // reset instruction count
  // console.log(instructionPart); // check
  // console.log(instructionCount); // check
  $z.showSlide(instructionPart + instructionCount); // and show slides
  $(document).scrollTop(0);// go to top of page
};

var hideHiddenEnable = function(id){
  $(".hideToShow").hide();
  $("#" + id).removeAttr("disabled");
}

var showHiddenDisable = function(id){
  $(".hideToShow").show();
  if(id) {
    $("#" + id).attr("disabled",true);
  }
}

var startFreePeriod = function(){
  $z.showSlide("free-period"); // show free period
  wait(11*60*1000, function(){
    showHiddenDisable(); // wait X to enable button
    snd.play(); // beep
  }); 
  wait(12*60*1000, function(){
    startQuestions(); // wait X milliseconds then go onto next questions automatically
  });
  checkIt();
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
  window.opener.experimentData = experiment.allData; // save data to parent window
  window.opener.experiment.end(); // call the experiment end in parent window

  wait(5000, function(){
    closeWindow();
  });
};

var closeWindow = function() {
  window.close();
}

// checking window size every 30 seconds

 //code goes here that will be run every 1 second (note-  should be changed to 30)

var isActive = true;

function checkIt(){
  nCheck = 1
  var myTimer = setInterval(function(){ 
        if(instructionPart != "questions") { // if you're not at questions yet...
          experiment.recordWindow("windowCheck_" + nCheck);

          window.onfocus = function () { 
            isActive = true; 
          }; 

          window.onblur = function () { 
            isActive = false; 
          }; 

        } else {
          clearInterval(myTimer);
        }
        console.log(isActive);
        nCheck ++;
  }, 10000);
}

// Submitting data

var experiment = {
  // An array to store the data that we're collecting.
  allData: [],
  // The function that gets called when the sequence is finished.
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
    experiment.allData.push(data);
  },
  recordWindow: function(name) {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    data = {
      question: name,
      answer: windowHeight + " by " + windowWidth + "; active=" + isActive
    };
    experiment.allData.push(data);
  },
}

var saveFingerprint =  function() {
  data = {
    question: "fingerprint",
    answer: fingerprint
  };
  experiment.allData.push(data);
}

var lastTime = new Date(); // initialize time on load

// get multiple key press.
var map = []; // Or you could call it "key"
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
    if(map[69] && map[48] && map[49]){ // CTRL+SHIFT+A
        askSkip();        
        map = [];
    };
}
var askSkip = function() {
    var x;
    if (confirm("Are you sure you want to skip to the questions?") == true) {
        startQuestions();
    }
}


// this gets annoying really quick...
var snd = new Audio("audio/beep.wav"); // buffers automatically when created

//$z.showSlide("questions5"); // for testing
$z.showSlide("instructions1"); // This is where the task starts
//$z.showSlide("question1");
//$z.showSlide("cog-task");
//$z.showSlide("sc-task");

// TODO: 
// [ ] Put launcher into Mturk and test it.
// [ ] Transfer data to launch screen
// [ ] binned randomized group?


