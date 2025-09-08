"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5678/webhook/trends")
      .then(res => res.json())
      .then(data => setTrends(data));
  }, []);

  return (
    <div>
      <h1>Trend Analysis</h1>
      {trends ? (
        <pre>{JSON.stringify(trends, null, 2)}</pre>
      ) : (
        "Loading trends..."
      )}
    </div>
  );
}
