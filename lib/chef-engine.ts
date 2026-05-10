import { createChatCompletion } from "./ollama";
import { getSession } from "./memory";

export async function handleChefChat(body: any) {
  const session = getSession(body.session_id);

  let userPrompt = "";

  switch (session.step) {
    case "start":
      userPrompt = `
Analyze these ingredients:
${body.ingredients.join(", ")}
`;
      session.step = "suggest";
      break;

    case "suggest":
      userPrompt = `
Suggest 3 meals using the ingredients.
Ask the user to choose one.
`;
      session.step = "choose";
      break;

    case "choose":
      userPrompt = `
User selected:
${body.message}

Start cooking.
Give ONE step only.
`;
      session.step = "cook";
      break;

    default:
      userPrompt = `
Continue the recipe.
Only ONE step.
`;
  }

  const messages = [
    {
      role: "system",
      content: `
You are a professional chef.

Rules:
- Never skip steps
- One step at a time
- Human-like chef personality
- Ask before continuing
      `,
    },

    ...session.history,

    {
      role: "user",
      content: userPrompt,
    },
  ];

  let completion: any;
  try {
    completion = await createChatCompletion({
      model: "gpt-oss:120b-cloud",
      messages,
      temperature: 0.7,
    });
  } catch (err: any) {
    console.error("Ollama request error:", err);
    try {
      console.error("Ollama error (stringified):", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    } catch (e) {
      // ignore stringify errors
    }
    throw err;
  }

  const reply =
    completion.choices[0].message.content || "No response";

  session.history.push({
    role: "user",
    content: body.message,
  });

  session.history.push({
    role: "assistant",
    content: reply,
  });

  return {
    reply,
    step: session.step,
  };
}