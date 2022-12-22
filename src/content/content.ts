import { startNotifications } from "./injections/ShowNotification";

var started = false;
var tabSig: string = crypto.randomUUID();
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.tabSig && request.tabSig != tabSig) {
    // old content script? Render it useless
    return false;
  }
  console.log("Message received in content script!", request);

  if (request.message == `start_notifications`) {
    console.log(`my tab sig: ${tabSig} won out!`);
    startNotifications();
  }
  if (request.message == "notifications_already") {
    sendResponse({ already: started, tabSig: tabSig });
    started = true;
  }
});
