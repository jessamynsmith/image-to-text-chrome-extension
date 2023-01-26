var getTextFromImage = function (imageUrl) {
  var apiUrl = "http://165.227.42.38:5000/api/v1/ocr/url/";
  // console.log('Getting text for imageUrl: ' + imageUrl);
  
  const form = new FormData();
  form.append('url', imageUrl);
  const fetchParams = {
    method: 'POST',
    body: form
  };

  fetch(apiUrl, fetchParams)
  .then((response) => response.text())
  .then((data) => {
    console.log('data', data);
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {imageText: data});
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

chrome.contextMenus.create({
  id: 'get_text_item',
  title: "Get Text",
  contexts: ["all"]
});

// "activeTab" permission is sufficient for this:
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  
  chrome.scripting.executeScript({
    target: {tabId: tab.id, allFrames: true},
    files: ['manipulateDOM.js'],
  });
  
  var srcUrl = null;
  if (info.hasOwnProperty('srcUrl')) {
    srcUrl = info.srcUrl;
  }
  if (srcUrl) {  
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'srcUrl': srcUrl});
      });
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    getTextFromImage(request.imageUrl);
  });
