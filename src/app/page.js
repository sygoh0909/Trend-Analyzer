"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/videos.csv") // from public folder
      .then(res => res.blob())
      .then(fileBlob => {
        const formData = new FormData();
        formData.append("file", fileBlob, "videos.csv");

        return fetch("https://primary-production-e0065.up.railway.app/webhook/get-trends", {
          method: "POST",
          body: formData,
        });
      })
      .then(res => res.text()) // check raw response
      .then(text => console.log("Raw response from n8n:", text))
      .catch(err => console.error("Upload error:", err));
  }, []);

  return <h1>Uploading CSV to n8n...</h1>;
}
