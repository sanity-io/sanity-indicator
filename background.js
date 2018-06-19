var tabId = null;

chrome.webRequest.onBeforeRequest.addListener(
  function onRequestMatch(info) {
    if (tabId !== null) {
      chrome.browserAction.setIcon({ path: "s_48.png", tabId: tabId });
      chrome.browserAction.setTitle({
        tabId: tabId,
        title: "This page appears to be powered by Sanity.io 🎉"
      });
      chrome.browserAction.setPopup({
        tabId: tabId,
        popup: "powered.html"
      });
    }
  },
  {
    urls: ["https://*.sanity.io/*"],
    types: ["xmlhttprequest", "image"]
  }
);

chrome.runtime.onMessage.addListener(function handleMessage(message, sender) {
  if (message === "setTabId") {
    tabId = sender.tab.id;
  }
});
