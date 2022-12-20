import { startNotifications } from "./injections/ShowNotification";

chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in content script!", request);

  if (request == "start_notifications") {
    startNotifications();
  }
});
