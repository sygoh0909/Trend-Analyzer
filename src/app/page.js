"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    fetch("https://primary-production-169d0.up.railway.app/webhook/get-trends")
      .then(res => res.json())
      .then(data => setTrends(data));
  }, []);

  return (
    <div>
      <h1>Trend Analysis</h1>
      <pre>{JSON.stringify(trends, null, 2)}</pre>
    </div>
  );
}
