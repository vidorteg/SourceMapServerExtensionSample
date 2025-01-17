chrome.devtools.panels.create("SourceMapServerExt_1stImpl",
  "../../icons/icon16.png",
  "../../devtoolsPanel.html",
  function (panel) {
    console.log("invoked panelCreation");
  }
);

const registeredPlugins = [];

class LocalSourceMapServerExtension {
  async loadSourceMapURL(parameters) {
    let textResponse;
    try {
      if (parameters && parameters.sourceURL.startsWith('http://127.0.0.1') && !parameters.sourceURL.includes(':sourcemap') && (parameters.sourceURL.startsWith('http') || parameters.sourceURL.startsWith('https'))
        && (parameters.sourceURL.includes('.js') || parameters.sourceURL.includes('.mjs'))
        && !parameters.sourceURL.includes('8080')){
          const retrievedSourceMapUrl = (parameters.sourceURL.toString()).replace('8081', '8080').concat('.map');
          const response = await fetch(retrievedSourceMapUrl);
          const decodedResponse = await response.text();
          textResponse = `data:text/plain;base64,${btoa(decodedResponse)}`;
      }
    } catch (error) {
      console.error(`Error while loading sourceMap:\n${error}`);
    } finally {
      return textResponse;
    }
  }
}

class LocalSourceMapServerExtensionDataURL {
  async loadSourceMapURL(parameters) {
    let textResponse;
    try {
      if (parameters && parameters.sourceURL.startsWith('http://127.0.0.1') && !parameters.sourceURL.includes(':sourcemap') && (parameters.sourceURL.startsWith('http') || parameters.sourceURL.startsWith('https'))
        && (parameters.sourceURL.includes('.js') || parameters.sourceURL.includes('.mjs'))
        && !parameters.sourceURL.includes('8080')){
          textResponse = (parameters.sourceURL.toString()).replace('8081', '8080').concat('.map');
      }
    } catch (error) {
      console.error(`Error while loading sourceMap:\n${error}`);
    } finally {
      return textResponse;
    }
  }
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    let plugin;
    if (request.command === "registerSourceMapServer") {
      plugin = new LocalSourceMapServerExtensionDataURL();
      chrome.devtools.debugger.sourceMapServerExtensions.registerSourceMapServerExtensionPlugin(
        plugin,
        "SourceMapServerExtension"
      );
      registeredPlugins.push(plugin);
      sendResponse({ ack: `succesfully registered sourcemapserver` });
    } else if (request.command === "unregisterSourceMapServer") {
      plugin = registeredPlugins.pop();
      if (plugin) {
        chrome.devtools.debugger.sourceMapServerExtensions.unregisterSourceMapServerExtensionPlugin(plugin);
        sendResponse({ ack: `succesfully unregistered sourcemapserver` });
      }
    }
  }
);
