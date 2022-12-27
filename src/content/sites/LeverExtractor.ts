import { JobDetails } from "../actions/CollectJobInfo";
import { queryJobDataFromURL } from "../queries/JobQuery";
import cheerio from "cheerio";
function transformLeverIntoJobInfo(url: string, $: cheerio.Root): JobDetails {
  const details: JobDetails = {};

  try {
    var job_posting = JSON.parse(
      $('script[type="application/ld+json"]').html() as string
    );
    // ORDER MATTERS, when pushing to Sheets API
    details.company = job_posting.hiringOrganization.name;
    details.role = job_posting.title;
    details.URL = url;
    details.status = "Sending application";
  } catch (err) {}

  return details;
}

export async function getLeverJobInfo(url: string) {
  var data: string = (await queryJobDataFromURL(url)) as string;
  if (data) {
    var html = cheerio.load(data);
    return transformLeverIntoJobInfo(url, html);
  }
}
