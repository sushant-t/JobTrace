import { showNotification } from "./injections/ShowNotification";

chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in content script!", request);

  if (request == "show_notification") {
    showNotification();
  }
});
