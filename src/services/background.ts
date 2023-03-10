import { pushJobToSheetsAPI } from "./actions/CollectJobInfo";
import { fetchGoogleToken } from "./auth/GoogleAuth";
import { executeNotificationContentScript } from "./executors/NotificationExecutor";
import "regenerator-runtime/runtime.js";

chrome.tabs.onActivated.addListener(() => {
  console.log("tab switched");
  executeNotificationContentScript();
});

var timeout: string | number | NodeJS.Timeout | undefined;
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // console.log("tab updated", tabId, changeInfo);

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

  if (request.message && request.message == "push_job" && request.job_type) {
    pushJobToSheetsAPI(
      process.env.REACT_GOOGLE_SHEET_IDENTIFIER as string,
      request.job_type
    ); // change to spreadsheet id
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
