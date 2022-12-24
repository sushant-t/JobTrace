import ky from "ky";

export async function queryJobDataURL(
  workdayURL: string
): Promise<Object | undefined> {
  try {
    var resp = (await ky.get(workdayURL).json()) as object;
    console.log(resp);
    return resp;
  } catch (err) {
    console.error(err);
  }
}
