const rawBase = process.env.OLLAMA_BASE_URL || "https://ollama.com";
const normalizedBase = rawBase.replace(/^https?:\/\/api\.ollama\.com/, "https://ollama.com").replace(/\/$/, "");

console.log("OLLAMA base URL:", normalizedBase);

type ChatRequest = {
  model: string;
  messages: any[];
  temperature?: number;
};

export async function createChatCompletion(opts: ChatRequest) {
  const url = `${normalizedBase}/v1/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OLLAMA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: opts.model, messages: opts.messages, temperature: opts.temperature ?? 0.7 }),
  });

  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`${res.status} ${res.statusText}: ${text}`);
    // attach some details for debugging
    (err as any).status = res.status;
    (err as any).body = text;
    throw err;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}