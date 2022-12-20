import { getActiveTab } from "../../utils/ChromeUtil";
import { getWorkdayJobListing } from "../queries/WorkdayJobQuery";
import {
  createWorkdayJobDataURL,
  transformWorkdayIntoJobInfo,
} from "../sites/WorkdayExtractor";

export interface JobDetails {
  company?: string;
  role?: string;
  URL?: string;
  status?: string;
}
class JobInfo {
  details: JobDetails;
  constructor(data: JobDetails) {
    this.details = data;
  }
}

export async function getJobInfo(): Promise<JobDetails | void> {
  var url = await getActiveTabURL();
  url = createWorkdayJobDataURL(url);
  var data: { [key: string]: any } | undefined = await getWorkdayJobListing(
    url
  );
  if (data) {
    return transformWorkdayIntoJobInfo(data);
  }
}

export async function getActiveTabURL(): Promise<string> {
  const url: string = (await getActiveTab()).url as string;
  return url;
}
