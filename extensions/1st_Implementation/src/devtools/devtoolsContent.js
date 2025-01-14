const registerButton = document.getElementById('registerButton');
const unregisterButton = document.getElementById('unregisterButton');


registerButton.onclick = (event) => {
  request = { command: "registerSourceMapServer" }
  chrome.runtime.sendMessage(request, (response) => {
    if (response) {
      console.log(response.ack);
    }
  });
}

// Uncomment this when you are doing the performance test and comment out the
// click behavior

// request = { command: "registerSourceMapServer" }
// chrome.runtime.sendMessage(request, (response) => {
//   if (response) {
//     console.log(response.ack);
//   }
// })();

unregisterButton.onclick = (event) => {
  request = { command: "unregisterSourceMapServer" }
  chrome.runtime.sendMessage(request, (response) => {
    if (response) {
      console.log(response.ack);
    }
  })
}