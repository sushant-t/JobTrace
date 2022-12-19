import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import axios from "axios";

const API_KEY = "";

const customAxios = axios.create({
  adapter: fetchAdapter,
});

export async function updateSheetValues(token: string, sheet_id: string) {
  const data = {
    requests: [
      {
        repeatCell: {
          range: {
            startColumnIndex: 0,
            endColumnIndex: 1,
            startRowIndex: 0,
            endRowIndex: 1,
            sheetId: 0,
          },
          cell: {
            userEnteredValue: {
              numberValue: 10,
            },
          },
          fields: "*",
        },
      },
    ],
  };

  const headers = {
    "Content-Type": "application/json",
    //update this token with yours.
    Authorization: `Bearer ${token}`,
  };
  const resp = await customAxios
    .post(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}:batchUpdate?key=${API_KEY}`,
      data,
      {
        headers: headers,
      }
    )
    .catch(function (err) {
      console.log(err);
    });
  if (resp) console.log(resp);
}
