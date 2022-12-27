import ky from "ky";

export async function queryJobDataFromURL(
  jobURL: string
): Promise<Object | string | undefined> {
  try {
    var resp = await ky.get(jobURL);
    console.log(resp);
    var body: string;
    if (resp.headers.get("content-type") == "application/json") {
      body = await resp.json();
    } else {
      body = await resp.text();
    }
    return body;
  } catch (err) {
    console.error(err);
  }
}
