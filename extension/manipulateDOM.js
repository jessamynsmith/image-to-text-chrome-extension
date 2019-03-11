var overlayId = 'overlayId';
var overlayStyleName = 'overlay';
var alerted = false;

function displayOverlay(text) {
  removeOverlay();

  var overlayNode = document.createElement('div');
  overlayNode.id = overlayId;
  overlayNode.className = overlayStyleName;

  var newContent = document.createTextNode(text);
  overlayNode.appendChild(newContent);

  document.getElementsByTagName('body')[0].appendChild(overlayNode);
}

function removeOverlay() {
  var overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.remove();
  }
}

var displayOverlayAndSetTimer = function(imageUrl) {
  if (imageUrl) {
    displayOverlay('Getting text from image...');
    // If text is successfully extracted, overlay will be removed.
    // Set timeout in case extraction fails.
    setTimeout(removeOverlay, 32000);
  
    alerted = false;
  
    chrome.runtime.sendMessage({imageUrl: imageUrl});
  } else {
    alert("Unable to extract text from this element");
  }
  
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.hasOwnProperty('imageText')) {
      if (!alerted) {
        alerted = true;
        removeOverlay();
        alert(request.imageText);
      }
    } else if (request.hasOwnProperty('srcUrl')) {
      displayOverlayAndSetTimer(request.srcUrl);
    }
    
  });


var selection = document.getSelection();
var focusNode = selection.focusNode;

var imageUrl = null;
if (focusNode && focusNode.nodeName === "DIV") {
  // Facebook share screen
  var ancestor = focusNode.closest('[data-testid="react-composer-root"]');
  if (ancestor) {
    var imageDescendant = ancestor.querySelector('[data-ploi^="http"]');
    imageUrl = imageDescendant.dataset.ploi;
  }

  displayOverlayAndSetTimer(imageUrl);
}
