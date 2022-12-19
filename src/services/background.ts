import { fetchGoogleToken } from "./auth/GoogleAuth";
import { updateSheetValues } from "./sheets/SheetsAPI";

chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in background!", request);

  if (request == "open_google_auth") {
    fetchGoogleToken().then((token) => {
      console.log("google token: ", token);
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
