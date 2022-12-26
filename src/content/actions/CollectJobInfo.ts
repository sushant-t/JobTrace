import { fetchGoogleToken } from "../../services/auth/GoogleAuth";
import { updateSheetValues } from "../../services/sheets/SheetsAPI";
import { getActiveTab } from "../../utils/ChromeUtil";
import { getEightfoldAIJobInfo } from "../sites/EightfoldAIExtractor";
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
}

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
  if (type == "workday") {
    return JobType.WORKDAY;
  }
  if (type == "eightfold_ai") {
    return JobType.EIGHTFOLD_AI;
  }
  if (type == "lever") {
    return JobType.LEVER;
  }
}

export async function getActiveTabURL(): Promise<string> {
  const url: string = (await getActiveTab()).url as string;
  return url;
}
