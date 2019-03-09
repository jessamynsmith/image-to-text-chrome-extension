var overlayId = 'overlayId';
var overlayStyleName = 'overlay';

function displayOverlay(text) {
  console.log('Overlaying test: ', text);
  
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('dom listener', request.imageText);
    var dataNode = document.querySelector('[data-text="true"]');
    dataNode.innerHTML += request.imageText;
    removeOverlay();
  });

var selection = document.getSelection();

// Facebook share screen
var ancestor = selection.focusNode.closest('[data-testid="react-composer-root"]');
var imageDescendent = ancestor.querySelector('[data-ploi^="http"]');
var imageUrl = imageDescendent.dataset.ploi;

displayOverlay('Getting text from image...');
// If text is successfully extracted, overlay will be removed.
// Set timeout in case extraction fails.
setTimeout(removeOverlay, 32000);

chrome.runtime.sendMessage({imageUrl: imageUrl});
