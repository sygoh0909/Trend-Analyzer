"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult] = useState("Uploading...");

  useEffect(() => {
    fetch("/videos.csv") // from public folder
      .then(res => {
        if (!res.ok) throw new Error("Failed to load CSV from /public");
        return res.blob();
      })
      .then(fileBlob => {
        const formData = new FormData();
        formData.append("file", fileBlob, "videos.csv");

        return fetch("https://n8n-ea7t.onrender.com/webhook/get-trends", {
          method: "POST",
          body: formData,
        });
      })
      .then(async res => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setResult(JSON.stringify(json, null, 2)); // pretty JSON
          console.log("✅ JSON response from n8n:", json);
        } catch {
          setResult(text); // if not JSON, show raw text
          console.log("ℹ️ Raw response from n8n:", text);
        }
      })
      .catch(err => {
        setResult("❌ Error: " + err.message);
        console.error("Upload error:", err);
      });
  }, []);

  return (
    <div>
      <h1>Trend Analysis Result</h1>
      <pre>{result}</pre>
    </div>
  );
}
