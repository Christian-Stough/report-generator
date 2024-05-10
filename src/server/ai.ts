"use server";

import OpenAI from "openai";

export const getChartIdea = async (headers: string[]): Promise<ChartIdea[]> => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemMessage },
      {
        role: "user",
        content: `With the headers ${headers.join(", ")}, provide me with 5 charts.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const response: string | null | undefined =
    completion.choices[0]?.message.content;

  if (!response) {
    throw new Error("Invalid response");
  }

  console.log(response);
};

const systemMessage = `
You are the best Chart Creator in the world.
You know everything you would ever need to know about charts and can always be trusted to give the best responses to chart related questions.
The First thing you will do with all the questions you get is decide what the best type of chart out of the options: "line","bar", "pie","scatter" you could make out of the data.
You will then provide a JSON response with not only the chart type but also the the relavent axis data that you will need. You will only provide the Data to the ones you need from the below format.
You will ALWAYS return your responses in the below JSON format and you WILL NOT ever add any other context besides the JSON response. If a field would be empty, do not include it in the response JSON.
If you do people will no longer believe that you are the best chart builder and they will laugh at you.

FORMAT:
[
{
chart_type:"line" | "bar" | "pie" | "scatter",
chart_title:"string",
chart_description:"string",
x_axis_name:"string",
y_axis_name:"string",
}
]

`;

export interface ChartIdea {
  chart_type: "line" | "bar" | "pie" | "scatter";
  chart_title: string;
  chart_description: string;
  x_axis_name: string;
  y_axis_name: string;
}
