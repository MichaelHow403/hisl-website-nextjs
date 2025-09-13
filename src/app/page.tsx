"use client";
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
    } catch {
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section
