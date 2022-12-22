import { getActiveTab } from "../../utils/ChromeUtil";

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

export async function getActiveTabURL(): Promise<string> {
  const url: string = (await getActiveTab()).url as string;
  return url;
}
