"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Load the file from public folder
    fetch("/videos.csv")
      .then(res => res.blob())
      .then(fileBlob => {
        const formData = new FormData();
        formData.append("file", fileBlob, "videos.csv");

        return fetch("https://primary-production-169d0.up.railway.app/webhook/get-trends", {
          method: "POST",
          body: formData,
        });
      })
      .then(res => res.json())
      .then(data => console.log("Trend results:", data));
  }, []);

  return <h1>Uploading CSV to n8n...</h1>;
}
