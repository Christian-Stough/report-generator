"use server";

export const getCsvData = async (form: FormData): Promise<CsvData> => {
  const file: File = form.get("file") as File;

  try {
    const text = await file.text();
    const rows: string[][] = text
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.replaceAll("\r", "")));

    const headers = rows.shift();

    if (!headers) {
      throw new Error("No headers found");
    }

    console.log(headers, rows);

    return { headers, rows };
  } catch (error) {
    console.error(error);
    throw new Error("Invalid CSV file");
  }
};

export interface CsvData {
  headers: string[];
  rows: string[][];
}
