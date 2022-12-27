import { JobDetails } from "../actions/CollectJobInfo";
import ky from "ky";
const API_KEY = "";

function transformDataIntoUpdateSheetsValues(
  data: JobDetails,
  sheet_id: string
): object {
  var rowData = Object.entries(data).map((elem) => {
    return {
      userEnteredValue: {
        stringValue: elem[1],
      },
    };
  });

  const values = {
    requests: [
      {
        updateCells: {
          start: {
            sheetId: sheet_id,
          },
          rows: [
            {
              values: rowData,
            },
          ],
          fields: "*",
        },
      },
    ],
  };

  return values;
}

function transformDataIntoAppendSheetValues(data: JobDetails, sheet: any) {
  var rowData = Object.values(data);
  const request = {
    range: `${sheet.properties.title}!A:D`,
    majorDimension: "ROWS",
    values: [rowData],
  };

  return request;
}

export async function updateSheetValues(
  token: string,
  spreadsheet_id: string,
  data: object
) {
  var spreadsheet_props = await getSpreadsheetProperties(token, spreadsheet_id);

  await addHeadersToBlankSheet(token, spreadsheet_props);
  await appendSheetValues(token, spreadsheet_props, data);
}

async function pushSheetValues(
  token: string,
  spreadsheet_props: any,
  data: object
) {
  var sheet_id = spreadsheet_props.sheets[0].properties.sheet_id;
  data = transformDataIntoUpdateSheetsValues(data, sheet_id);
  const headers = {
    "Content-Type": "application/json",
    //update this token with yours.
    Authorization: `Bearer ${token}`,
  };
  try {
    const resp = await ky.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_props.spreadsheetId}:batchUpdate?key=${API_KEY}`,
      {
        json: data,
        headers: headers,
      }
    );
    if (resp) console.log(resp);
  } catch (err) {
    console.log(err);
  }
}

async function appendSheetValues(
  token: string,
  spreadsheet_props: any,
  data: object
) {
  var sheet = spreadsheet_props.sheets[0];
  var sheet_id = sheet.properties.sheet_id;
  var reqData: any = transformDataIntoAppendSheetValues(data, sheet);
  const headers = {
    "Content-Type": "application/json",
    //update this token with yours.
    Authorization: `Bearer ${token}`,
  };

  try {
    const resp = await ky.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${
        spreadsheet_props.spreadsheetId
      }/values/${
        reqData.range
      }:append?key=${API_KEY}&valueInputOption=${"USER_ENTERED"}&insertDataOption=${"INSERT_ROWS"}`,
      {
        json: reqData,
        headers: headers,
      }
    );
    if (resp) console.log(resp);
  } catch (err) {
    console.log(err);
  }
}

export async function getSpreadsheetProperties(
  token: string,
  spreadsheet_id: string
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    //update this token with yours.
    Authorization: `Bearer ${token}`,
  };
  try {
    const resp = await ky
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}?includeGridData=false`,
        {
          headers: headers,
        }
      )
      .json();
    if (resp) console.log(resp);
    return resp;
  } catch (err) {
    console.log(err);
  }
}

async function getSheetFirstRow(
  token: string,
  spreadsheet_props: any
): Promise<{ [key: string]: any } | undefined> {
  const headers = {
    "Content-Type": "application/json",
    //update this token with yours.
    Authorization: `Bearer ${token}`,
  };

  var spreadsheet_id = spreadsheet_props.spreadsheetId;
  var sheet = spreadsheet_props.sheets[0];
  var range = `${sheet.properties.title}!A1:D1?majorDimension=ROWS`;
  try {
    const resp = await ky
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${range}`,
        {
          headers: headers,
        }
      )
      .json();
    if (resp) console.log(resp);
    return resp!;
  } catch (err) {
    console.log(err);
  }
}

async function addHeadersToBlankSheet(token: string, spreadsheet_props: any) {
  var first_row = await getSheetFirstRow(token, spreadsheet_props);
  if (!first_row || !first_row.values) {
    // spreadsheet is blank
    await appendSheetValues(token, spreadsheet_props, {
      company: "Company",
      role: "Role",
      URL: "URL",
      status: "Status",
    });
  }
}
