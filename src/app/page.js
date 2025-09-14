"use client";

import { useState, useEffect } from 'react';

// Main App component
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to clean up malformed strings from the API response
  const cleanString = (str) => {
    if (!str) return '';
    // Remove leading and trailing single quotes, brackets, and spaces
    return str.replace(/^\[*'|'\]*$/g, '').trim();
  };

  useEffect(() => {
    // This effect now uses your fetch logic to get live data from your API.
    fetch("/videos.csv") // from public folder
      .then(res => {
        if (!res.ok) throw new Error("Failed to load CSV from /public");
        return res.blob();
      })
      .then(fileBlob => {
        const formData = new FormData();
        formData.append("file", fileBlob, "videos.csv");

        // Use the new API endpoint
        return fetch("https://primary-production-3afc2.up.railway.app/webhook/get-trends", { // changed to run local/deployed backend services
          // primary-production-3afc2.up.railway.app
          //can use localhost, ngrok, or railway connection link
          method: "POST",
          body: formData,
        });
      })
      .then(async res => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setData(json); // Set the parsed JSON directly
          console.log("✅ JSON response from n8n:", json);
        } catch {
          // If the response isn't JSON, handle it as an error
          setError("Received a non-JSON response from the server.");
          console.log("ℹ️ Raw response from n8n:", text);
        }
        setLoading(false);
      })
      .catch(err => {
        setError("❌ Error: " + err.message);
        setLoading(false);
        console.error("Upload error:", err);
      });
  }, []);

  const trendStatusIcon = {
    growing: '↑',
    decaying: '↓',
    neutral: '→',
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">Trend Dashboard</h1>
        {data && (
          <div className="text-sm text-gray-500">
            <p>Total Videos Analyzed: <span className="font-semibold">{data.totalVideos}</span></p>
            <p>Data Freshness: <span className="font-semibold">{new Date(data.trendFreshness).toLocaleString()}</span></p>
          </div>
        )}
      </header>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
          <p className="ml-4 text-gray-600">Loading trends...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {/* RENDER TOP TAGS */}
      {data && data.topTags && data.topTags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Tags</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.topTags.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{cleanString(item.tag)}</h3>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${item.trendStatus === 'growing' ? 'bg-green-100 text-green-800' : item.trendStatus === 'decaying' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.trendStatus.charAt(0).toUpperCase() + item.trendStatus.slice(1)}
                  </span>
                </div>
                <p className="text-4xl font-extrabold text-gray-800 mb-2">
                  {item.count}
                  <span className="text-lg text-gray-500 ml-2">videos</span>
                </p>
                <div className="text-gray-600 mb-4">
                  <span className="font-medium">Status: </span>
                  <span className="text-lg font-bold">
                    {trendStatusIcon[item.trendStatus]} {item.trendStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER TOP KEYWORDS */}
      {data && data.topKeywords && data.topKeywords.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Keywords</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.topKeywords.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{cleanString(item.word)}</h3>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${item.trendStatus === 'growing' ? 'bg-green-100 text-green-800' : item.trendStatus === 'decaying' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.trendStatus.charAt(0).toUpperCase() + item.trendStatus.slice(1)}
                  </span>
                </div>
                <p className="text-4xl font-extrabold text-gray-800 mb-2">
                  {item.count}
                  <span className="text-lg text-gray-500 ml-2">mentions</span>
                </p>
                <div className="text-gray-600 mb-4">
                  <span className="font-medium">Status: </span>
                  <span className="text-lg font-bold">
                    {trendStatusIcon[item.trendStatus]} {item.trendStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* RENDER MESSAGE IF NO DATA IS FOUND */}
      {data && (!data.topTags || data.topTags.length === 0) && (!data.topKeywords || data.topKeywords.length === 0) && (
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <p className="text-lg text-gray-500">No trend data was found. Please check your API response.</p>
        </div>
      )}
    </div>
  );
};

export default App;
