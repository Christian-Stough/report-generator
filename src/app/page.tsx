"use client";

import { useState } from "react";
//CONTRACT: This Component will accept CSV data,validate it is CSV, and then send it to the server for processing

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("File is required");
      return;
    } else if (file.type !== "text/csv") {
      setError("File must be a CSV file");
      return;
    }
  };

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Enter in Data</CardTitle>
          <CardDescription className="text-red-500">
            {error && error}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="file">File</Label>
              <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setError(null);
                  setFile(e.target.files?.[0] as File | null);
                }}
              />
            </div>
            <Button type="submit" className="text-foreground w-full">
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
