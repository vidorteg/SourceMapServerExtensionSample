chrome.devtools.panels.create('SourceMapServerExt_2ndImpl',
  '../../icons/icon16.png',
  '../../devtoolsPanel.html',
  function (panel) {
    console.log('invoked panelCreation');
  }
);

const registeredPlugins = [];
// let totalCalls = 0;
// let totalSourcemaps = 0;

class LocalSourceMapServerExtension {
  reportResourceLoad(resourceUrl, status) {
    console.log(`Resource loaded: ${resourceUrl} ${status.success} `);
  }
}

/**
 * This is an example of a custom filtering. 
 * 3rd party developers can decide which resources they want to respond
 * depending on their type, protocol or domain.
 *  
 **/
function filterResource(resource) {
  if (resource.url.startsWith('http://127.0.0.1') && !resource.url.includes(':sourcemap') && (resource.url.startsWith('http') || resource.url.startsWith('https'))
    && (resource.url.includes('.js') || resource.url.includes('.mjs'))
    && !resource.url.includes('8080')) {
    return true;
  } else {
    return false;
  }
}

async function sourceMapURLDataURL(resource) {
  let textResponse;
  const startTime = performance.now()
  try {
    const retrievedSourceMapUrl = (resource.url.toString()).replace('8081', '8080').concat('.map');
    const response = await fetch(retrievedSourceMapUrl);

    const decodedResponse = await response.text();

    // encoding in dataURL
    textResponse = `data:text/plain;base64,${btoa(decodedResponse)}`;

    totalSourcemaps++;
  } catch (error) {
    console.error(`Error while loading sourceMap:\n${error}`);
  } finally {
    const endTime = performance.now();
    return textResponse;
  }
}

async function sourceMapURLNonDataURL(resource) {
  return Promise.resolve((resource.url.toString()).replace('8081', '8080').concat('.map'));
}

// Uncomment this when you are doing the performance test and comment out the
// click behavior

// chrome.devtools.network.onNavigated.addListener(url => {
//   totalCalls = 0;
//   totalSourcemaps = 0;
// })

chrome.runtime.onConnect.addListener(
  (port) => {
    port.onMessage.addListener(function (msg) {
      if (port.name === 'sourceMapServerExtension') {
        chrome.devtools.inspectedWindow.onResourceAdded.addListener(
          async (resource) => {
           // totalCalls++;
           if (filterResource(resource)) {
            const sourceMap = await sourceMapURLNonDataURL(resource);
            if (sourceMap) {
              resource.attachSourceMapURL(sourceMap, true, (error) => {
                if (error && error.code !== 'OK') {
                  port.postMessage({ resource: 'Error while processing source map from extension' });
                }
              })

              //console.log(`totalSourcemaps ${totalSourcemaps}`);
              }
            }
          }
        );
      }
    });
  }
);
