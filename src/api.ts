import { Hono } from "hono";
import { cors } from "hono/cors";
import { OpenAI } from "./openai";

const app = new Hono();

app.use("*", cors());

app.get("/health", (c) => c.json({ status: "200", messages: "Hello Hono!" }));

app.post("/api/v1/translate", async (c) => {
  const body = await c.req.json();

  const env = c.env!.OPENAI_KEY as string
  try {
    const openaiClient = new OpenAI(env);
    const generatedMessage = await openaiClient.generateMessage(body.prompt);
    if (!generatedMessage || generatedMessage === "")
      throw new Error("No message generated");
    return c.json({ status: "200", messages: generatedMessage });
  } catch (err: unknown) {
    return c.json({ status: "500", messages: err });
  }
});

export default app;
