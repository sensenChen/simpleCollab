// const
const socket = io();
const jsbOpts = {
  indent_size : 2
};
// var
var firepad;
var editor;
var beautify;
var runOn = false;
var language = "C++";

function init() {
  document.getElementById("language").innerHTML = language;

  // Initialize Firebase.
  var config = {
    apiKey: "AIzaSyDGwNauUSJWyRtwpJS2WoF-XYf3cdp29TM",
    authDomain: "simplecollab-a6eb3.firebaseapp.com",
    databaseURL: "https://simplecollab-a6eb3.firebaseio.com",
    projectId: "simplecollab-a6eb3",
    storageBucket: "",
    messagingSenderId: "558227688118"
  };
  firebase.initializeApp(config);

  // Get Firebase Database reference.
  var firepadRef = firebase.database().ref();

  // Create Ace editor.
  editor = ace.edit('firepad');
  editor.setTheme("ace/theme/tomorrow");
  editor.getSession().setMode("ace/mode/c_cpp");
  editor.setShowPrintMargin(false);
  editor.getSession().setTabSize(2);
  editor.getSession().setUseWrapMode(true);
  editor.setOption('indentedSoftWrap', false);
  editor.session.setUseSoftTabs(true);
  editor.focus();

  // Beautify
  beautify = ace.require("ace/ext/beautify");

  // Create Firepad.
  firepad = Firepad.fromACE(firepadRef, editor);
  firepad.on('ready', function() {});
  firepad.on('synced', function(isSynced) {});

  $('#firepad').css("height",$(window).innerHeight());
  $('.ace_gutter').css("background","#47484B");
  $('.ace_gutter').css("color","white");
  $('.ace_gutter-active-line').css("background","#353538");
}

$(window).resize(function(){
  $('#firepad').css('height', $(window).innerHeight());
  $('#firepad').css("width",$(window).innerWidth());

  $('#right').css('height', $(window).innerHeight());
  $('#right').css("width",$(window).innerWidth()/2);
});

socket.on("run_success", function(data) {
  output.innerText = data;
})

socket.on("run_fail", function(data) {
  output.innerText = data;

})

function toggleRun() {
  runOn = !runOn;
  if(runOn) {
    $("#right").show();
    $('#firepad').css('height', $(window).innerHeight());
    $('#firepad').css("width",$(window).innerWidth()/2);
    $('#right').css('height', $(window).innerHeight());
    $('#right').css("width",$(window).innerWidth()/2);
  } else {
    $("#right").hide();
    $('#firepad').css('height', $(window).innerHeight());
    $('#firepad').css("width",$(window).innerWidth());
    output.innerText = "";
  }
}

function clearEditor() {
  editor.setValue("");
}

function setLanguage(l) {
  document.getElementById("language").innerHTML = l;
  if(l=="Javascript") {
    editor.getSession().setMode("ace/mode/javascript");
  }  else if(l=="Java") {
    editor.getSession().setMode("ace/mode/java");
  } else if(l=="Python") {
    editor.getSession().setMode("ace/mode/python");
  } else {
    editor.getSession().setMode("ace/mode/c_cpp");
  }
}

function beautifyEditor() {
  const session = editor.session;
  session.setValue(js_beautify(session.getValue(), jsbOpts));
}

function runCode() {
  socket.emit('run', {code: firepad.getText()});
}
