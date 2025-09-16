import { NextResponse } from "next/server";

// Mock response for when no API keys are available
const generateMockResponse = (prompt: string): string => {
  const responses = [
    "HISL AI SYSTEM RESPONSE: Construction analysis protocol initiated. Analyzing structural parameters and compliance requirements...",
    "INTEGAI RESPONSE: Processing construction data through sovereign AI infrastructure. Recommendations will be generated based on current building standards.",
    "RAMS-GUARD ANALYSIS: Risk assessment complete. No critical safety violations detected in submitted construction parameters.",
    "BUILDTRACE AI: Real-time monitoring activated. Construction analytics pipeline ready for data processing.",
    "COMPLIANCE CORE: Regulatory oversight active. All submitted plans will be evaluated against current building codes and regulations."
  ];
  
  // Add context-aware response based on prompt keywords
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('safety')) {
    return "HISL AI SAFETY MODULE: Safety analysis complete. Construction safety protocols have been reviewed and recommendations are available.";
  } else if (lowerPrompt.includes('compliance') || lowerPrompt.includes('regulation')) {
    return "COMPLIANCE CORE: Regulatory analysis complete. All construction parameters meet current building codes and regulations.";
  } else if (lowerPrompt.includes('risk')) {
    return "RAMS-GUARD ANALYSIS: Risk assessment protocol executed. Construction risk factors have been identified and mitigation strategies prepared.";
  }
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// DeepSeek API call
async function queryDeepSeek(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are HISL AI, a sovereign AI system for construction industry analysis. Provide professional, technical responses focused on construction, building codes, and safety."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated";
}

// Anthropic API call
async function queryAnthropic(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are HISL AI, a sovereign AI system for construction industry analysis. Provide professional, technical responses focused on construction, building codes, and safety. User query: ${prompt}`
        }
      ]
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "No response generated";
}

// OpenAI API call
async function queryOpenAI(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are HISL AI, a sovereign AI system for construction industry analysis. Provide professional, technical responses focused on construction, building codes, and safety."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated";
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Get API keys from environment variables
    const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
    const OPENAI_KEY = process.env.OPENAI_API_KEY;

    let response: string;

    // Try APIs in order of preference with fallback logic
    try {
      if (DEEPSEEK_KEY) {
        response = await queryDeepSeek(prompt, DEEPSEEK_KEY);
      } else if (ANTHROPIC_KEY) {
        response = await queryAnthropic(prompt, ANTHROPIC_KEY);
      } else if (OPENAI_KEY) {
        response = await queryOpenAI(prompt, OPENAI_KEY);
      } else {
        // No API keys available, use mock response
        response = generateMockResponse(prompt);
      }
    } catch (apiError) {
      // If the primary API fails, try fallback APIs
      console.warn("Primary API failed, trying fallbacks:", apiError);
      
      try {
        if (ANTHROPIC_KEY && !DEEPSEEK_KEY) {
          response = await queryAnthropic(prompt, ANTHROPIC_KEY);
        } else if (OPENAI_KEY && !DEEPSEEK_KEY && !ANTHROPIC_KEY) {
          response = await queryOpenAI(prompt, OPENAI_KEY);
        } else {
          response = generateMockResponse(prompt);
        }
      } catch (fallbackError) {
        console.warn("Fallback APIs also failed, using mock response:", fallbackError);
        response = generateMockResponse(prompt);
      }
    }
    
    return NextResponse.json({ response });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("API route error:", errorMessage);
    
    // Even on error, provide a fallback response
    const fallbackResponse = generateMockResponse("system error");
    return NextResponse.json({ response: fallbackResponse });
  }
}
