"use client";

import { useState } from "react";
import Step_1 from "./_components/Step_1";
import { getCsvData } from "~/server/csv";
import type { CsvData } from "~/server/csv";
import { getChartIdea } from "~/server/ai";

export default function HomePage() {
  const [headers, setHeaders] = useState<string[] | null>(null);
  const [rows, setRows] = useState<string[][] | null>(null);
  const [charts, setCharts] = useState<string[] | null>(null);

  const [step, setStep] = useState<number>(1);
  const [pending, isPending] = useState<boolean>(false);

  const handleDataChange = async (value: File) => {
    //isPending(true);

    const form = new FormData();
    form.append("file", value);

    const data: CsvData = await getCsvData(form);

    setRows(data.rows);
    setHeaders(data.headers);

    await getChartIdea(data.headers);

    //isPending(false);
    //setStep(2);
  };

  if (pending) return <div>Loading...</div>;
  else if (step === 1) return <Step_1 setData={handleDataChange} />;

  return <div>Step 2</div>;
}
