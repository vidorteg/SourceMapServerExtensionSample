console.log('test from devtoolsContent.js');
const registerButton = document.getElementById('registerButton');
const unregisterButton = document.getElementById('unregisterButton');
const resultArea = document.getElementById('resultArea');

registerButton.onclick = (event) => {
  request = { command: "register" }

  let port = chrome.runtime.connect({name: "sourceMapServerExtension"});
  port.postMessage(request);
  port.onMessage.addListener(function(message) {
    if (message.resource) {
      console.log(message.resource);
    }
  });
}

// Uncomment this when you are doing the performance test and comment out the
// click behavior
//
// request = { command: "register" }
// let port = chrome.runtime.connect({name: "sourceMapServerExtension"});
// port.postMessage(request);

unregisterButton.onclick = (event) => {
  request = { command: "unregister" }
  chrome.runtime.sendMessage(request, (response) => {
    if (response) {
      console.log(response.ack);
    }
  })
}