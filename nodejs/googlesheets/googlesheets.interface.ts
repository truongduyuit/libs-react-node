import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";

export interface SheetDataGetter<T> {
  sheet: GoogleSpreadsheetWorksheet;
  options?: {
    query?: T;
    select?: number;
    page?: number;
    limit?: number;
  };
}
