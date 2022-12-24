// this will not work, since API keys only allow read access on Google APIs
export async function fetchGoogleToken() {
  const token = await new Promise<string>(function (resolve, reject) {
    chrome.storage.local.get(["google_token"], function (result) {
      var one_day = 24 * 60 * 60 * 1000; // one day in milliseoncds
      if (
        result.google_token &&
        result.cache_time &&
        Date.now() - result.cache_time < one_day
      ) {
        resolve(result.google_token);
      } else {
        chrome.identity.getAuthToken(
          { interactive: true },
          function (token: string) {
            chrome.storage.local.set(
              { google_token: token, cache_time: Date.now() },
              function () {
                resolve(token);
              }
            );
          }
        );
      }
    });
  });
  return token;
}
