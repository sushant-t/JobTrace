import { JobDetails, getActiveTabURL } from "../actions/CollectJobInfo";
import { queryJobDataFromURL } from "../queries/JobQuery";

export function createEightfoldAIDataURL(url: string): string {
  var link = new URL(url);
  var jobId = link.searchParams.get("pid");
  var assetPath = `/api/apply/v2/jobs/${jobId}`;

  return link.origin + assetPath;
}

export function transformEightfoldAIIntoJobInfo(
  url: string,
  data: {
    [key: string]: any;
  }
): JobDetails {
  const details: JobDetails = {};
  try {
    // ORDER MATTERS, when pushing to Sheets API
    details.company = getEightfoldAICompany(url, data.job_description);
    details.role = data.name;
    details.URL = url;
    details.status = "Sending application";
  } catch (err) {}

  return details;
}

export function getEightfoldAICompany(url: string, description: string) {
  var domain = getEightfoldAIDomain(url);
  if (!domain) {
    console.error("No domain available");
    return;
  }

  var start = description.toLowerCase().indexOf(domain.toLowerCase());
  var end = start + domain.length;
  return description.substring(start, end);
}

function getEightfoldAIDomain(url: string) {
  var urlObj = new URL(url);
  return urlObj.searchParams.get("domain")?.split(".")[0];
}

export async function getEightfoldAIJobInfo(
  url: string
): Promise<JobDetails | void> {
  var dataURL = createEightfoldAIDataURL(url);
  var data: { [key: string]: any } | undefined = (await queryJobDataFromURL(
    dataURL
  )) as { [key: string]: any };
  if (data) {
    return transformEightfoldAIIntoJobInfo(url, data);
  }
}
