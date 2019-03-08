var selection = document.getSelection();

var ancestor = selection.focusNode.closest('[data-testid="react-composer-root"]');

var imageDescendent = document.evaluate('div/div/div[3]/div/span/div/div/div/div/div/div/div/div/div/div[1]/div/div/div/a', 
  ancestor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var imageUrl = imageDescendent.dataset.ploi;

chrome.runtime.sendMessage({imageUrl: imageUrl});
