import { fetchGoogleToken } from "../auth/GoogleAuth";
import { updateSheetValues } from "../sheets/SheetsAPI";
import { getActiveTab } from "../../utils/ChromeUtil";
import { getEightfoldAIJobInfo } from "../sites/EightfoldAIExtractor";
import { getGreenhouseJobInfo } from "../sites/GreenhouseExtractor";
import { getLeverJobInfo } from "../sites/LeverExtractor";
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
  LEVER,
  GREENHOUSE,
}

var job_types: { [key: string]: JobType } = {
  workday: JobType.WORKDAY,
  eightfold_ai: JobType.EIGHTFOLD_AI,
  lever: JobType.LEVER,
  greenhouse: JobType.GREENHOUSE,
};

class JobInfo {
  details: JobDetails;
  constructor(data: JobDetails) {
    this.details = data;
  }
}

export async function getJobInfo(type: string): Promise<any> {
  var url = await getActiveTabURL();
  var job_type = detectJobType(type);

  var data;
  if (job_type == JobType.WORKDAY) {
    data = await getWorkdayJobInfo(url);
  }
  if (job_type == JobType.EIGHTFOLD_AI) {
    data = await getEightfoldAIJobInfo(url);
  }
  if (job_type == JobType.LEVER) {
    data = await getLeverJobInfo(url);
  }
  if (job_type == JobType.GREENHOUSE) {
    data = await getGreenhouseJobInfo(url);
  }
  return data;
}

export async function pushJobToSheetsAPI(
  spreadsheet_id: string,
  job_type: string
) {
  var data: JobDetails = await getJobInfo(job_type);
  var token = await fetchGoogleToken();
  await updateSheetValues(token, spreadsheet_id, data);
  return true;
}

function detectJobType(type: string): JobType | undefined {
  return job_types[type];
}

export async function getActiveTabURL(): Promise<string> {
  const url: string = (await getActiveTab()).url as string;
  return url;
}
