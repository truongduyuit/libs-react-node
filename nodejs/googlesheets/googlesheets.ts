import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
  ServiceAccountCredentials,
} from "google-spreadsheet";
import { SheetDataGetter } from ".";

import { googlesheetConfigs } from "./index";

type Props = {
  sheetId: string;
};

export class GoogleSheetAPI extends GoogleSpreadsheet {
  private static instance: GoogleSheetAPI;
  private sheets: GoogleSpreadsheetWorksheet[] = [];

  constructor({ sheetId }: Props) {
    super(sheetId);
  }

  public static async getInstance(): Promise<GoogleSheetAPI> {
    if (!this.instance)
      this.instance = new GoogleSheetAPI({
        sheetId: process.env.SHEET_ID ?? "",
      });
    await this.instance.connect(googlesheetConfigs);
    await this.instance.loadInfo();
    return this.instance;
  }

  connect = async (credentials: ServiceAccountCredentials) => {
    // google sheets
    // loads document properties and worksheets
    await this.useServiceAccountAuth(credentials);
    await this.loadInfo();
    return this;
  };

  //#region sheet
  loadSheets = () => {
    const { sheetCount } = this;

    this.sheets = [];

    for (let i = 0; i < sheetCount; i++) {
      this.sheets.push(this.sheetsByIndex[i]);
    }

    return this.sheets;
  };

  getAllSheets = (): GoogleSpreadsheetWorksheet[] => {
    return this.loadSheets();
  };

  getAllSheetNames = (): string[] => {
    const { sheetCount } = this;
    const listSheetNames: string[] = [];
    for (let i = 0; i < sheetCount; i++) {
      listSheetNames.push(this.sheetsByIndex[i].title);
    }
    return listSheetNames;
  };
  //#endregion

  //#region rows
  getSheetData = async <T>({
    sheet,
    options = {},
  }: SheetDataGetter<T>): Promise<T[]> => {
    const { query = {}, select, page, limit } = options;

    const data: T[] = [];

    let sheetRows: GoogleSpreadsheetRow[] = await sheet.getRows();
    const headerValues = sheet.headerValues as string[];

    sheetRows.forEach((row: GoogleSpreadsheetRow) => {
      if (select && data.length >= select) return;

      let d = {} as T;
      for (let i = 0; i < headerValues.length; i++) {
        const prop: string = headerValues[i];
        const cell: string = row._rawData[i];

        if (query) {
          const q = JSON.parse(JSON.stringify(query));
          if (q[prop] !== undefined && q[prop].toString() !== cell) break;
        }

        d = { ...d, [prop]: cell };
      }

      if (Object.keys(d).length > 0) data.push(d as T);
    });

    return typeof page === "number" && limit
      ? data.slice(page * limit, (page + 1) * limit)
      : data;
  };
  //#endregion
}
