"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState(""); // Stores user input
  const [ambiance, setAmbiance] = useState(""); // Stores ambiance-based search query
  const [results, setResults] = useState([]); // Stores search results
  const [loading, setLoading] = useState(false); // Shows loading state
  const [isListening, setIsListening] = useState(false); // Tracks voice recognition state
  const [recognitionInstance, setRecognitionInstance] = useState(null); // Stores recognition instance
  const [showDiscount, setShowDiscount] = useState(false); // Controls discount pop-up

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

  // Function to start voice recognition
  const startVoiceRecognition = (inputType) => {
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

      if (inputType === "query") {
        setQuery(speechResult);
        handleSearch(speechResult);
      } else if (inputType === "ambiance") {
        setAmbiance(speechResult);
        handleSearch(speechResult);
      }

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

  // Function to show discount pop-up for 10 seconds
  const handleDiscountClick = () => {
    setShowDiscount(true);
    setTimeout(() => {
      setShowDiscount(false);
    }, 10000);
  };

  // Function to fetch a random suggestion from the backend
  const handleRandomSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/restaurants/generate/random`);
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();
      setResults([data]);
    } catch (error) {
      console.error("Error fetching random suggestion:", error);
      alert("Failed to fetch data. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#68D2E8] p-6 text-center relative">
      {/* Logo - Centered */}
      <Image 
        src="/1.png" 
        alt="MoodHunters Logo" 
        width={200} 
        height={200} 
        className="mb-4"
      />

      {/* Instructions - Louisville Focused */}
      <h2 className="text-2xl font-bold text-[#FDDE55]">
        Discover the Best Small Businesses in Louisville!
      </h2>
      <p className="text-white mt-3 max-w-lg text-lg font-medium leading-relaxed">
        <span className="font-semibold">How it works:</span> 
        <br />
        ❤️ Click the heart to speak your request 
        <br />
        🔎 Type or speak a mood or business type (e.g., cozy coffee shop, lively bar)  
        <br />
        🎲 Feeling adventurous? Click "Surprise Me!"
      </p>

      {/* Search Bar */}
      <div className="mt-6 flex w-full max-w-md">
        <input
          type="text"
          placeholder="Type your request..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 text-black bg-white rounded-l-lg focus:outline-none"
        />
        <button
          onClick={() => handleSearch(query)}
          className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Ambiance-Based Search */}
      <div className="mt-4 flex w-full max-w-md">
        <input
          type="text"
          placeholder="What vibe are you looking for?"
          value={ambiance}
          onChange={(e) => setAmbiance(e.target.value)}
          className="w-full p-3 border border-gray-300 text-black bg-white rounded-l-lg focus:outline-none"
        />
        <button
          onClick={() => handleSearch(ambiance)}
          className="bg-pink-500 text-white px-4 py-3 rounded-r-lg hover:bg-pink-600"
        >
          Find by Ambiance
        </button>
      </div>

      {/* Voice Input - Heart Button ❤️ */}
      <button
        onClick={() => startVoiceRecognition("query")}
        className="mt-4 bg-red-500 text-white px-5 py-4 w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-red-600"
      >
        ❤️
      </button>

      {/* Stop Button */}
      {isListening && (
        <button
          onClick={stopVoiceRecognition}
          className="mt-2 bg-gray-500 text-white px-4 py-3 w-full max-w-md rounded-lg hover:bg-gray-600"
        >
          🛑 Stop Listening
        </button>
      )}

      {/* Random Recommendation */}
      <button onClick={handleRandomSearch} className="mt-4 bg-green-500 text-white px-4 py-3 w-full max-w-md rounded-lg hover:bg-green-600">
        🎲 Surprise Me!
      </button>

      {/* Discount Button (Always Visible) */}
      <button onClick={handleDiscountClick} className="fixed bottom-5 right-5 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600">
        🎁
      </button>

      {/* Discount Pop-Up */}
      {showDiscount && (
        <div className="absolute bottom-20 right-5 bg-white p-4 rounded-lg shadow-lg text-black w-64">
          <h3 className="font-bold">🎁 Thank You!</h3>
          <p className="text-sm">
            Thank you for choosing MoodHunters!
            Enjoy 10% off at your favorite small business in Louisville.  
          </p>
          <button onClick={() => setShowDiscount(false)} className="text-red-500 mt-2">
            ❌ Close
          </button>
        </div>
      )}

      {/* Search Results */}
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
