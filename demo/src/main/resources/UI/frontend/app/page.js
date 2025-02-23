"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState(""); // Stores user input
  const [mood, setMood] = useState(""); // Stores mood-based search query
  const [results, setResults] = useState([]); // Stores search results
  const [loading, setLoading] = useState(false); // Shows loading state
  const [isListening, setIsListening] = useState(false); // Tracks voice recognition state
  const [recognitionInstance, setRecognitionInstance] = useState(null); // Stores recognition instance

  // Function to fetch search results from the backend
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/restaurants/generate?userInput=${searchQuery}`);
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch data. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch mood-based restaurant recommendations
  const handleMoodSearch = async (moodQuery) => {
    if (!moodQuery) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/restaurants/generate?userInput=${moodQuery}`);
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching mood-based recommendations:", error);
      alert("Failed to fetch data. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a random recommendation
  const handleRandomSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/random`); // Ensure backend supports this
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();
      setResults([data]); // Display a single random result
    } catch (error) {
      console.error("Error fetching random recommendation:", error);
      alert("Could not fetch a random place. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to start voice recognition
  const startVoiceRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      console.log("User said:", speechResult);
      setQuery(speechResult);
      handleSearch(speechResult); // Automatically search after speech
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Could not process speech. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setRecognitionInstance(recognition);
  };

  // Function to stop voice recognition
  const stopVoiceRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsListening(false);
      console.log("Voice recognition stopped by user.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-600">MoodHunters</h1>
      <p className="text-gray-700 mt-2 max-w-md">
        Not sure where to go? <br />
        Speak, type, or let us pick a place for you!
      </p>

      {/* Search Bar (Text Input) */}
      <div className="mt-6 flex w-full max-w-md">
        <input
          type="text"
          placeholder="Type your request..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={() => handleSearch(query)}
          className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Mood-Based Search Bar */}
      <div className="mt-6 flex w-full max-w-md">
        <input
          type="text"
          placeholder="How are you feeling? (e.g., romantic, adventurous)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={() => handleMoodSearch(mood)}
          className="bg-pink-500 text-white px-4 py-3 rounded-r-lg hover:bg-pink-600"
        >
          Find by Mood
        </button>
      </div>

      {/* Interaction Options: Voice, Text, and Random */}
      <div className="mt-6 flex flex-col w-full max-w-md space-y-4">
        {/* Voice Input Button */}
        <div className="flex space-x-4">
          <button
            onClick={startVoiceRecognition}
            className={`px-4 py-3 w-full rounded-lg text-white ${
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {isListening ? "🎙️ Listening..." : "🎤 Speak Your Request"}
          </button>
          {isListening && (
            <button
              onClick={stopVoiceRecognition}
              className="bg-gray-500 text-white px-4 py-3 w-full rounded-lg hover:bg-gray-600"
            >
              🛑 Stop
            </button>
          )}
        </div>

        {/* Random Recommendation Button */}
        <button
          onClick={handleRandomSearch}
          className="bg-green-500 text-white px-4 py-3 w-full rounded-lg hover:bg-green-600"
        >
          🎲 Surprise Me!
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
