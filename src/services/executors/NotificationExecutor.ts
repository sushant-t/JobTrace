export function executeNotificationContentScript() {
  try {
    chrome.tabs
      .query({
        active: true,
        lastFocusedWindow: true,
      })
      .then((tabs) => {
        var tab = tabs[0];
        chrome.action.setBadgeText({
          tabId: tab.id as number,
          text: "",
        });
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id as number },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(tab.id as number, "start_notifications");
          }
        );
      });
  } catch (error) {
    console.log(error);
  }
}
