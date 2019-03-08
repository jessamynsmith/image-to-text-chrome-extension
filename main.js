var getTextFromImage = function (image) {
  var apiUrl = "https://auto-scribe-backend.herokuapp.com/api/v1/ocr/url/";

  var srcUrl = image.srcUrl;

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        alert(this.responseText);
      } else {
        alert('error status: ' + this.status);
      }
    }
  };

  // Open a new connection, using the POST request on the URL endpoint
  request.open('POST', apiUrl, true);

  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Send request
  request.send('url=' + encodeURIComponent(srcUrl));
};

chrome.contextMenus.create({
  title: "OCR",
  contexts: ["image"],
  onclick: getTextFromImage
});