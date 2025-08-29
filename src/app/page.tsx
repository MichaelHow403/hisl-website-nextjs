import Image from "next/image";
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
    } catch (error) {
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/AI_Construction_Bridge.png')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image
            src="/images/HISL_Logo.jpeg"
            alt="HISL Logo"
            width={200}
            height={200}
          />
          <p className="text-white text-xl mt-4">
            Intelligence for Sovereign Offline Leadership
          </p>
        </div>
      </section>

      {/* Sovereign AI Globe Section */}
      <section className="py-16 text-center">
        <Image
          src="/images/globe_3d_with_ravens.png"
          alt="Sovereign AI Globe"
          width={400}
          height={400}
          className="mx-auto"
        />
        <p className="mt-4 text-lg">Global Offline-First AI Control</p>
      </section>

      {/* Mythology Section */}
      <section className="py-16 flex flex-col items-center">
        <div className="flex justify-center gap-8">
          <Image
            src="/images/raven_huginn.png"
            alt="Raven Huginn"
            width={200}
            height={200}
          />
          <Image
            src="/images/raven_muninn.png"
            alt="Raven Muninn"
            width={200}
            height={200}
          />
        </div>
        <p className="mt-4 text-lg">
          Huginn and Muninn: Thought and Memory in Sovereign AI
        </p>
      </section>

      {/* DeepSeek Form Section */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Interact with DeepSeek API
          </h2>
          <div className="p-4 border rounded-lg bg-white shadow-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="border p-2 rounded-lg h-32 resize-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
            {response && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                <strong>Response:</strong>
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center">
        <Image
          src="/images/IngegAI_Logo.png"
          alt="IntegAI Logo"
          width={150}
          height={150}
        />
        <div className="opacity-50 mt-4">
          <Image
            src="/images/Hard_Hat_digital_paperwork.jpeg"
            alt="Watermark"
            width={100}
            height={100}
          />
        </div>
      </footer>
    </main>
  );
}
