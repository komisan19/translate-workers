export type OpenAiApiResponse = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
  };

  type Choice = {
    message: any;
    index: number;
    logprobs: null;
    finish_reason: string;
  };

  type Usage = {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };