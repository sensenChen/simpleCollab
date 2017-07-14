window.onload = function() {
    var pad = document.getElementById('editor');
    var counter = 1;
    pad.focus();
    pad.contentEditable = true;
    
    pad.selectionStart = pad.selectionEnd = 5;
  
    // make the tab act like a tab
    pad.addEventListener('keydown',function(e) {
      if(e.keyCode === 9) { // tab was pressed
//          // get caret position/selection
//          var start = this.selectionStart;
//          var end = this.selectionEnd;
//
//          var target = e.target;
//          var value = target.value;
//
//          // set textarea value to: text before caret + tab + text after caret
//          target.value = value.substring(0, start) + "  " + value.substring(end);
//
//          // put caret at right position again (add one for the tab)
//          this.selectionStart = this.selectionEnd = start + 2;
//
//          // prevent the focus lose
//          e.preventDefault();
      } else if(e.keyCode === 13){    
//        counter++;
//        var element = document.createElement("p");
//        element.setAttribute("readonly","true");
//        element.innerHTML = counter;
//        document.getElementById("linenumber").appendChild(element);
      } else if (e.keyCode==16){
//        console.log(this.selectionStart,this.selectionEnd);
      }
    });

};