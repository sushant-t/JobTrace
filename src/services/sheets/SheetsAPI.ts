export async function fetchGoogleToken() {
  const token = await new Promise<string>(function (resolve, reject) {
    chrome.identity.getAuthToken(
      { interactive: true },
      function (token: string) {
        resolve(token);
      }
    );
  });
  return token;
}
