// this will not work, since API keys only allow read access on Google APIs
export async function fetchGoogleToken() {
  const token = await new Promise<string>(function (resolve, reject) {
    chrome.storage.local.get(["google_token"], function (result) {
      if (result.google_token) {
        resolve(result.google_token);
      } else {
        chrome.identity.getAuthToken(
          { interactive: true },
          function (token: string) {
            chrome.storage.local.set({ google_token: token }, function () {
              resolve(token);
            });
          }
        );
      }
    });
  });
  return token;
}
