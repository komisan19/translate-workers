import { OpenAiApiResponse } from "./types/openai";

export class OpenAI {
  private readonly headers: Record<string, string>;
  private readonly baseUrl = "https://api.openai.com";

  constructor(apiKey: string) {
    this.headers = {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    };
  }

  public async generateMessage(
    message: string
  ): Promise<string | undefined> {
    const data = JSON.stringify({
      prompt: `次の日本語のテキストを英語に翻訳してください：${message}`,
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 12,
      temperature: 0.9,
      stop: "\n",
    });
    const apiResp = await fetch(`${this.baseUrl}/v1/completions`, {
      method: "POST",
      headers: this.headers,
      body: data,
    })
      .then((res): Promise<OpenAiApiResponse> => res.json())
      .catch((err) => {
        console.log(`OpenAI API error: ${err}`);
        return ;
      });

    if (!apiResp) return "";

    return apiResp.choices.map((choice) => choice.text.trim())[0]
  }
}