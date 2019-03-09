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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!alerted) {
      alerted = true;
      removeOverlay();
      alert(request.imageText);
    }
  });

var selection = document.getSelection();
var focusNode = selection.focusNode;

var imageUrl = null;
if (focusNode) {
  if (focusNode.firstChild && focusNode.firstChild.tagName === "IMG") {
    // Right-click of an image
    imageUrl = focusNode.firstChild.getAttribute("src");
  } else {
    // Facebook share screen
    var ancestor = focusNode.closest('[data-testid="react-composer-root"]');
    if (ancestor) {
      var imageDescendent = ancestor.querySelector('[data-ploi^="http"]');
      imageUrl = imageDescendent.dataset.ploi;
    }
  }
}

if (imageUrl) {
  displayOverlay('Getting text from image...');
  // If text is successfully extracted, overlay will be removed.
  // Set timeout in case extraction fails.
  setTimeout(removeOverlay, 12000);
  
  alerted = false;
  
  chrome.runtime.sendMessage({imageUrl: imageUrl});
} else {
  alert("Unable to extra text from this element");
}
