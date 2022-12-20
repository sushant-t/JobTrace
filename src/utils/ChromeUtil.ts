export async function getActiveTab(): Promise<any> {
  return await new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      resolve(tabs[0]);
    });
  });
}
