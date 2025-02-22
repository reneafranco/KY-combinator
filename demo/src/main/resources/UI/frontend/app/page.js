"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState(""); // Stores user input
  const [results, setResults] = useState([]); // Stores API search results
  const [loading, setLoading] = useState(false); // Shows loading state

  // Function to handle search
  const handleSearch = async () => {
    if (!query) return; // Don't search if input is empty
    setLoading(true); // Show loading state

    try {
      const response = await fetch(`http://localhost:8080/search?q=${query}`);
      const data = await response.json(); // Convert response to JSON
      setResults(data); // Store search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-600">MoodHunters</h1>
      <p className="text-gray-700 mt-2">Find local businesses based on your mood!</p>

      {/* Search Bar */}
      <div className="mt-6 flex w-full max-w-md">
        <input
          type="text"
          placeholder="What are you in the mood for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}

      {/* Display Results */}
      <div className="mt-6 w-full max-w-md">
        {results.length > 0 && (
          <ul className="bg-white p-4 rounded-lg shadow-md">
            {results.map((business, index) => (
              <li key={index} className="border-b py-2 last:border-b-0">
                <strong>{business.name}</strong>
                <p className="text-sm text-gray-600">{business.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
