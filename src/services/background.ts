import { getActiveTab } from "../utils/ChromeUtil";
import { fetchGoogleToken } from "./auth/GoogleAuth";
import { updateSheetValues } from "./sheets/SheetsAPI";

chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in background!", request);

  if (request == "open_google_auth") {
    fetchGoogleToken().then((token) => {
      console.log("google token: ", token);
    });
  } else if (request == "show_notification") {
    chrome.tabs
      .query({
        active: true,
        lastFocusedWindow: true,
      })
      .then((tabs) => {
        var tab = tabs[0];
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id as number },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(tab.id as number, "show_notification");
          }
        );
      });
  }
});

///////// LIVE RELOAD DEV ENV
chrome.commands.onCommand.addListener((shortcut) => {
  console.log("lets reload");
  console.log(shortcut);
  if (shortcut.includes("+M")) {
    chrome.runtime.reload();
  }
});
