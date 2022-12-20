import { capitalize } from "../../utils/MiscUtil";
import { JobDetails } from "../actions/CollectJobInfo";

export function createWorkdayJobDataURL(url: string): string {
  var tenant = getWorkdayTenant(url);
  var siteId = getWorkdaySiteID(url);
  var assetPath = `/wday/cxs/${tenant}/${siteId}/job/`;

  return new URL(url).origin + assetPath + url.split("/").pop();
}
export function transformWorkdayIntoJobInfo(data: {
  [key: string]: any;
}): JobDetails {
  const details: JobDetails = {};
  try {
    details.company = getWorkdayCompany(
      data.jobPostingInfo.externalUrl,
      data.jobPostingInfo.jobDescription
    );
    details.URL = data.jobPostingInfo.externalUrl;
    details.role = data.jobPostingInfo.title;
    details.status = "Sending application";
  } catch (err) {}

  return details;
}

function getWorkdayCompany(url: string, description: string) {
  var company;
  company = getWorkdaySiteID(url);
  if (doesCompanyMatchDescription(company, description)) {
    return company;
  }
  company = getWorkdayTenant(url);
  if (doesCompanyMatchDescription(company, description)) {
    return capitalize(company);
  }
}

function getWorkdaySiteID(url: string) {
  var fields = url.split("/");
  return fields[Math.max(fields.indexOf("job"), fields.indexOf("details")) - 1];
}

function getWorkdayTenant(url: string) {
  var urlObj = new URL(url);
  return urlObj.hostname.split(".")[0];
}

function doesCompanyMatchDescription(company: string, description: string) {
  return description.toLowerCase().indexOf(company) >= 0;
}

function getWorkdayJobTitleDOM() {
  const elems = document.querySelectorAll(
    "[data-automation-id='[data-automation-id='jobPostingHeader']"
  );
  if (elems.length) {
    return elems[0].textContent;
  }
}

function getWorkdayJobLocationDOM() {
  const elems = document.querySelectorAll("[data-automation-id='locations']");
}
