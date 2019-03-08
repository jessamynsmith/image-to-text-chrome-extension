var overlayId = 'overlayId';
var overlayStyleId = 'overlayStyleId';
var overlayStyleName = 'overlay';

function createStyleNode() {
  var styleNode = document.getElementById(overlayStyleId);
  if (!styleNode) {

    styleNode = document.createElement('style');
    styleNode.id = overlayStyleId;
    var newContent = document.createTextNode('.' + overlayStyleName + ' {' +
      '        "position": "fixed",' +
      '        "top": "0px",' +
      '        "left": "0px",' +
      '        "width": "100%",' +
      '        "height": "100%",' +
      '        "background-color": "rgba(0,0,0,.5)",' +
      '        "z-index": "10000",' +
      '        "vertical-align": "middle",' +
      '        "text-align": "center",' +
      '        "color": "#fff",' +
      '        "font-size": "40px",' +
      '        "font-weight": "bold",' +
      '        "cursor": "wait"' +
      '    }');
    styleNode.appendChild(newContent);
    console.log(styleNode);
    document.getElementsByTagName('head')[0].appendChild(styleNode);
  }
}

function displayOverlay(text) {
  console.log('Overlaying test: ', text);
  
  // Remove any existing styles and overlays
  createStyleNode();
  removeOverlay();
  
  var overlayNode = document.createElement('div');
  overlayNode.id = overlayId;
  overlayNode.className = overlayStyleName;
  
  var newContent = document.createTextNode(text);
  overlayNode.appendChild(newContent);
  console.log(overlayNode);
  
  document.getElementsByTagName('body')[0].appendChild(overlayNode);
}

function removeOverlay() {
  var overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.remove();
  }
}


var selection = document.getSelection();

var ancestor = selection.focusNode.closest('[data-testid="react-composer-root"]');

var imageDescendent = document.evaluate('div/div/div[3]/div/span/div/div/div/div/div/div/div/div/div/div[1]/div/div/div/a', 
  ancestor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var imageUrl = imageDescendent.dataset.ploi;

displayOverlay('Getting text from image...');

chrome.runtime.sendMessage({imageUrl: imageUrl});
