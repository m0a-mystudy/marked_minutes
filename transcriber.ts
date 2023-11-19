
import fs from 'fs';
import { OpenAIApi, Configuration } from 'openai';
import config from './config.json';

class Transcriber {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: config.openai.api_key,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async transcribe(filename: string): Promise<string> {
    const audioData = fs.readFileSync(filename);
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: audioData.toString(),
      temperature: 0.6,
    });

    if (response.status !== 200) {
      throw new Error(`Failed to transcribe audio: ${response.statusText}`);
    }

    return response.data.choices[0].text;
  }
}

export default Transcriber;
