import { getActiveTab } from "../../utils/ChromeUtil";
import { getEightfoldAIJobInfo } from "../sites/EightfoldAIExtractor";
import { getWorkdayJobInfo } from "../sites/WorkdayExtractor";

export interface JobDetails {
  company?: string;
  role?: string;
  URL?: string;
  status?: string;
}

export enum JobType {
  WORKDAY,
  EIGHTFOLD_AI,
}
class JobInfo {
  details: JobDetails;
  constructor(data: JobDetails) {
    this.details = data;
  }
}

export async function getJobInfo(): Promise<any> {
  var url = await getActiveTabURL();
  var job_type = detectJobType(url);

  var data;
  if (job_type == JobType.WORKDAY) {
    data = await getWorkdayJobInfo(url);
  }
  if (job_type == JobType.EIGHTFOLD_AI) {
    data = await getEightfoldAIJobInfo(url);
  }

  return data;
}

export function detectJobType(url: string): JobType | undefined {
  if (url.includes("myworkdayjobs.com")) {
    return JobType.WORKDAY;
  }
  if (url.includes(".eightfold.ai")) {
    return JobType.EIGHTFOLD_AI;
  }
}

export async function getActiveTabURL(): Promise<string> {
  const url: string = (await getActiveTab()).url as string;
  return url;
}
