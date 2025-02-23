"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState(""); // Stores user input
  const [isListening, setIsListening] = useState(false); // Tracks speech recognition state
  const [errorMessage, setErrorMessage] = useState(""); // Stores error messages
  const [searchResults, setSearchResults] = useState([]); // Stores API results
  const [recognition, setRecognition] = useState(null); // Stores recognition instance

  // Function to handle text input changes
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to start voice recognition
  const startVoiceRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionInstance.lang = "en-US";
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;

    recognitionInstance.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "aborted") {
        alert("Speech recognition was interrupted. Please try again.");
      } else {
        alert(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionInstance.onresult = (event) => {
      if (event.results.length > 0) {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        console.log("Recognized speech:", transcript);
      } else {
        alert("No speech detected. Please try again.");
      }
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      console.log("Voice recognition stopped.");
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  // Function to stop voice recognition
  const stopVoiceRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      console.log("Voice recognition stopped by user.");
    }
  };

  // Function to handle search with the correct API endpoint
  const handleSearch = async () => {
    if (!query) {
      alert("Please enter or speak a search query.");
      return;
    }

    console.log("Searching for:", query);
    try {
      const response = await fetch(`http://localhost:8080/restaurants?q=${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setSearchResults(data); // Update state with search results
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch data. Ensure the backend is running.");
    }
  };

  // Function to suggest a random business
  const handleRandomSearch = () => {
    const randomSuggestions = ["cozy cafe", "live music venue", "bookstore cafe", "vegan restaurant", "food truck"];
    const randomChoice = randomSuggestions[Math.floor(Math.random() * randomSuggestions.length)];
    setQuery(randomChoice);
    handleSearch();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">MoodHunters</h1>

      {/* Search Container */}
      <div className="relative flex border border-gray-300 rounded-lg p-2 w-full max-w-md bg-white shadow-md">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a place..."
          className="flex-grow p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        
        {/* Voice Button (Pulsing When Active) */}
        <button
          onClick={startVoiceRecognition}
          className={`ml-2 p-2 rounded transition-all ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          🎤
        </button>

        {/* Stop Voice Recognition Button */}
        <button
          onClick={stopVoiceRecognition}
          className="ml-2 p-2 bg-red-500 text-white rounded"
          disabled={!isListening}
        >
          🛑
        </button>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🔍
        </button>

        {/* Random Business Suggestion */}
        <button
          onClick={handleRandomSearch}
          className="ml-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          🎲
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {/* Display Search Results */}
      <div className="mt-6 w-full max-w-md">
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((result, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all">
                {result.name} - {result.category}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results yet.</p>
        )}
      </div>
    </div>
  );
}

