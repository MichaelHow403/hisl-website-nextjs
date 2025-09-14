import { NextResponse } from "next/server";
import { z } from "zod";

// Input validation schema
const RequestSchema = z.object({
  agentId: z.string().min(1, "Agent ID is required"),
  prompt: z.string().min(1, "Prompt is required"),
  context: z.string().optional()
});

// Mock responses for different agents
const MOCK_RESPONSES = {
  'claude-3-5-sonnet': "I'm Claude, and I'd be happy to help with your request. This is a simulated response from the HISL demo environment.",
  'gpt-4': "Hello! I'm GPT-4. This is a demonstration response showing how your prompt would be processed through the global infrastructure.",
  'gemini-pro': "Hi there! I'm Gemini Pro. This simulated response demonstrates the journey your prompt takes across data centers.",
  'deepseek-coder': "// DeepSeek Coder response\n// This is a mock response showing code-focused AI capabilities\nfunction processPrompt(input) {\n  return 'Simulated response from DeepSeek';\n}"
};

// Simple energy estimation based on prompt length
function estimateEnergy(promptLength: number, agentId: string): number {
  const baseEnergy = 0.001; // kWh base
  const lengthMultiplier = promptLength * 0.0001;
  const agentMultiplier = agentId.includes('gpt-4') ? 1.5 : 1.0;
  
  return Math.max(0.001, baseEnergy + lengthMultiplier * agentMultiplier);
}

// Obfuscate any potential PII in logs
function sanitizeForLogging(text: string): string {
  // Remove potential email addresses, phone numbers, etc.
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
    .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[PHONE]')
    .replace(/\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g, '[CARD]');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Invalid request format", 
          details: validation.error.issues 
        }, 
        { status: 400 }
      );
    }

    const { agentId, prompt, context } = validation.data;
    
    // Log sanitized request (never log actual content in production)
    const sanitizedPrompt = sanitizeForLogging(prompt);
    console.log(`[LLM Gateway] Agent: ${agentId}, Prompt length: ${prompt.length}, Context: ${context ? 'provided' : 'none'}`);

    // Check for API keys and decide between real API call or mock
    const hasApiKey = process.env.ANTHROPIC_API_KEY || 
                     process.env.OPENAI_API_KEY || 
                     process.env.DEEPSEEK_API_KEY ||
                     process.env.GOOGLE_API_KEY;

    let response: string;
    let processingTime: number;
    const startTime = Date.now();

    if (hasApiKey && process.env.NODE_ENV === 'production') {
      // In production with API keys, you could call real APIs here
      // For now, we'll use enhanced mock responses
      response = `${MOCK_RESPONSES[agentId as keyof typeof MOCK_RESPONSES] || MOCK_RESPONSES['claude-3-5-sonnet']}

Your prompt: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"

This response was generated through the HISL global infrastructure, demonstrating how AI requests are routed and processed across distributed data centers.`;
    } else {
      // Mock mode - simulate processing delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      response = MOCK_RESPONSES[agentId as keyof typeof MOCK_RESPONSES] || MOCK_RESPONSES['claude-3-5-sonnet'];
    }

    processingTime = Date.now() - startTime;

    // Calculate energy estimate
    const energyEstimate = estimateEnergy(prompt.length, agentId);

    // Return response with metadata
    return NextResponse.json({
      response,
      metadata: {
        agentId,
        processingTime,
        energyEstimate,
        promptLength: prompt.length,
        hasContext: !!context,
        mode: hasApiKey ? 'api' : 'mock',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: unknown) {
    console.error('[LLM Gateway] Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    // Never expose internal errors to client
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "The request could not be processed. Please try again.",
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "operational",
    service: "LLM Gateway Demo",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    supportedAgents: Object.keys(MOCK_RESPONSES)
  });
}
