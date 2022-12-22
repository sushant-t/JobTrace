var tabHashes: { [key: string]: boolean } = {};

export function executeNotificationContentScript() {
  console.log("executing notification script");
  try {
    chrome.tabs
      .query({
        active: true,
        lastFocusedWindow: true,
      })
      .then((tabs) => {
        var tab = tabs[0];
        chrome.tabs.sendMessage(
          tab.id as number,
          {
            message: "notifications_already",
          },
          (response) => {
            console.log(response);

            if (!response || !tabHashes[response.tabSig]) {
              tabHashes[response.tabSig] = true;
              // if the content script doesn't exist, response will be undefined!!!
              setBadgeAndExecuteScript(tab, response.tabSig);
            } else {
              refreshNotificationContentScript(
                tab.id as number,
                response.tabSig
              );
            }
          }
        );
      });
  } catch (error) {
    console.log(error);
  }
}

function setBadgeAndExecuteScript(tab: chrome.tabs.Tab, tabSig: string) {
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
      chrome.tabs.sendMessage(tab.id as number, {
        message: "start_notifications",
        tabSig: tabSig,
      });
    }
  );
}

export function refreshNotificationContentScript(
  tabId: number,
  tabSig: string
) {
  console.log("refreshing.....");
  chrome.tabs.sendMessage(tabId as number, {
    message: "start_notifications",
    tabSig: tabSig,
  });
}
