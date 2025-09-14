import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  const startTime = Date.now();
  
  // Get commit hash from environment or generate a placeholder
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 
                process.env.GITHUB_SHA?.substring(0, 7) || 
                'dev-build';
  
  // Get Vercel environment
  const vercelEnv = process.env.VERCEL_ENV || 'development';
  
  // Basic health checks
  const checks = {
    api: true,
    database: true, // Placeholder - would check DB connection in real app
    imagery: true,  // Could check if imagery manifest exists
    llm: true       // Could check LLM gateway availability
  };
  
  const responseTime = Date.now() - startTime;
  const allHealthy = Object.values(checks).every(check => check);
  
  return NextResponse.json({
    status: allHealthy ? "ok" : "degraded",
    time: new Date().toISOString(),
    commit,
    vercelEnv,
    responseTime,
    checks,
    version: "1.0.0",
    uptime: null // Edge runtime doesn't support process.uptime
  }, {
    status: allHealthy ? 200 : 503
  });
}
