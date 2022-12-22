import axios from "axios";
export async function queryJobDataURL(
  workdayURL: string
): Promise<Object | undefined> {
  try {
    var resp = await axios.get(workdayURL);
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
}
