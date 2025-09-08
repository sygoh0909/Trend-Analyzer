"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    fetch("https://primary-production-169d0.up.railway.app/webhook/get-trends", {
      method: "POST", // 👈 must be POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ping: "hello n8n" }), // test payload
    })
      .then(res => res.json())
      .then(data => setTrends(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Trend Analysis</h1>
      <pre>{JSON.stringify(trends, null, 2)}</pre>
    </div>
  );
}
