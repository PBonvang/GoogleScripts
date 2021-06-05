/*
Credits: 

https://productforums.google.com/forum/#!topic/docs/w4MXeqJaefU
http://webapps.stackexchange.com/questions/23861/header-numbering-in-google-docs

Instructions to use:

In a Google Doc

Go to Tools > Script Editor 
Select the option to create the script for Google Docs.
Replace the Content of Code.gs with the code below.
Save it and name the project as say addHeaderNumbering.
Click play icon for the function addHeaderNumbering (authorize it when asked).

*/

function addHeaderNumbering () {
  var pars = DocumentApp.getActiveDocument().getBody().getParagraphs();
  var counterHeader = [0, 0, 0, 0, 0, 0];

  for(var i=0; i<pars.length; i++) {
    var par = pars[i];
    var hdg = par.getHeading();
    var headerIdx = null;

    if (hdg == DocumentApp.ParagraphHeading.HEADING1) 
      headerIdx = 0;
    else if (hdg == DocumentApp.ParagraphHeading.HEADING2)
      headerIdx = 1;
    else if (hdg == DocumentApp.ParagraphHeading.HEADING3) 
      headerIdx = 2;
    else if (hdg == DocumentApp.ParagraphHeading.HEADING4) 
      headerIdx = 3;
    else if (hdg == DocumentApp.ParagraphHeading.HEADING5)
      headerIdx = 4;
    else if (hdg == DocumentApp.ParagraphHeading.HEADING6) 
      headerIdx = 5;

    if (headerIdx != null)
      _addNumberingForHeaderType(par, headerIdx, counterHeader);
  }
}


function _addNumberingForHeaderType(paragraph, initIndex, counterHeader) {
  counterHeader[initIndex] = counterHeader[initIndex] + 1;
  var currCounter = _getCurrentNumbering(initIndex, counterHeader);
  for(var ii = initIndex + 1; ii < counterHeader.length; ii++) {
    counterHeader[ii] = 0;
  }
  var content = paragraph.getText();
  var chunks = content.split('. ')
  var spacer = ". ";

  var result = 'ok'
  if(chunks.length > 1) {
    paragraph.setText(currCounter+spacer+chunks[1]); 
  } else { 
    paragraph.setText(currCounter+spacer+chunks[0]);
  }
}


function _getCurrentNumbering(initIndex, counterHeader) {
  var value = '';
  for ( var i = 0; i <= initIndex; i++) {
    if (value) {
      value += '.';
    }
    value += counterHeader[i];
  }

  return value;
}