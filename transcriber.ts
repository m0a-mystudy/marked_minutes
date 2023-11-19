import fs from "fs";
import OpenAI from "openai";

class Transcriber {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI();
  }

  async transcribe(filename: string): Promise<string> {
    console.log("Transcribing audio file:", filename);
    try {
      // 録音ファイルのストリームを作成
      const audioFileStream = fs.createReadStream(filename);
      console.log("Created audio file stream.");
      
      // Whisper APIに送信して文字起こしを行う
      const transcriptionResponse =
        await this.openai.audio.transcriptions.create({
          model: "whisper-1",
          language: "ja",
          file: audioFileStream,
          response_format: "json",
        });

        console.log("Created transcription response.");
        
      // 文字起こしの結果を表示
      console.log("Transcription:", transcriptionResponse);

      // GPT-4モデルを使用して文字起こし結果を要約
      const summaryResponse = await this.openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content:
              "あなたは優秀な議事録記録者です。文字起こし内容を要約してmarkdown書式で纏めてください",
          },
          {
            role: "user",
            content:
              "この内容を要約してmarkdownにまとめてください\n\n" +
              transcriptionResponse.text,
          },
        ],
        max_tokens: 1000,
      });

      // 要約結果を返す
      return summaryResponse.choices[0].message.content || "";
    } catch (error) {
      console.error("Failed to transcribe audio:", error);
    }

    return "";
  }
}

export default Transcriber;
