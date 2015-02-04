/* global location, _, $, console, log, paramString, urlDefines, urlParams */


var fsIE6 = function(paramString) {
  window.open("task.html?" + paramString, "fullscreen", "fullscreen,height="+screen.height+",width="+screen.width+"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no");
};

$(document).ready(function() {
  if (typeof urlParams["pid"] == "undefined") {
    $("#manual-id").keyup(function() {
      if ($(this).val().length > 0) {
        $("#launch-screen button").removeAttr("disabled");
      } else {
        $("#launch-screen button").attr("disabled","disabled");
      }
    });

    $("#launch-screen button").one("click", function() {
      var id = $("#manual-id").val();

      var newUrlDefines = paramString + "&pid=" + id;
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
});

var done = function() {
  $("#launch-screen, #launch").hide();
  $("#done").show();
};
