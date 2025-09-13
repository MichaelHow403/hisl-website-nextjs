"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.response) {
        setResponse(data.response);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch {
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">HISL AI Assistant</h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="mb-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none h-32"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {response && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Response:</h2>
            <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
