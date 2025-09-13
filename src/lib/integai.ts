export async function callIntegAI(prompt: string) {
  const res = await fetch("/api/integai", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error(`IntegAI error: ${res.status}`);
  return res.json();
}
