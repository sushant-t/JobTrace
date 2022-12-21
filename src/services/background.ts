import { getActiveTab } from "../utils/ChromeUtil";
import { fetchGoogleToken } from "./auth/GoogleAuth";
import { executeNotificationContentScript } from "./executors/NotificationExecutor";
import { updateSheetValues } from "./sheets/SheetsAPI";

chrome.tabs.onActivated.addListener(() => {
  console.log("tab switched");
  executeNotificationContentScript();
});

var timeout: string | number | NodeJS.Timeout | undefined;
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log("tab updated", tabId, changeInfo);

  clearTimeout(timeout);
  timeout = setTimeout(executeNotificationContentScript, 1000);
});

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log("Message received in background!", request);

  if (request == "open_google_auth") {
    fetchGoogleToken().then((token) => {
      console.log("google token: ", token);
    });
  }
  if (request == "increment_badge") {
    chrome.action.setBadgeText({
      tabId: sender.tab!.id as number,
      text: "1",
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
