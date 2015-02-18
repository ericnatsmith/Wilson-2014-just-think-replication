/* global location, _, $, console, log, paramString, urlDefines, urlParams */

var wait = function(msec, fn) {
  setTimeout(fn, msec);
};

var fsIE6 = function(paramString) {
  //window.opener=self;
  var taskWindow = window.open("task.html?" + paramString, "fullscreen", "fullscreen,height="+screen.height+",width="+screen.width+"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no");
};

$(document).ready(function() {
  window.opener = self;
  if (typeof urlParams["hitId"] == "undefined") {
    $("#manual-id").keyup(function() {
      if ($(this).val().length > 0) {
        $("#launch-screen button").removeAttr("disabled");
      } else {
        $("#launch-screen button").attr("disabled","disabled");
      }
    });

    $("#launch-screen button").one("click", function() {
      var id = $("#manual-id").val();

      var newUrlDefines = paramString + "&hitId=" + id;
      log(newUrlDefines);
      fsIE6(newUrlDefines);
      
    });
    $("#launch-screen").show();



  } else {
    $("#launch button").one("click", function() {
      fsIE6(paramString);
    });
    $("#launch").show();
  }

  $("#enter-id").hide();
  $('#logo').click(function () {
      $("#enter-id").show();
  });
});

var done = function() {
  $("#launch-screen, #launch").hide();
  $("#done").show();
};


var experiment = {
  end: function() {
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    setTimeout(function() { turk.submit(experimentData) }, 1500);
  }
}
