import Recorder from "./recorder";
import Transcriber from "./transcriber";
import os from "os";
import path from "path";
import fs from "fs";

const recorder = new Recorder();
const transcriber = new Transcriber();


const audioFilename = path.join(os.tmpdir(), "recording.mp3");
process.on("exit", () => {
  console.log("Removing audio file..."+ audioFilename);
  fs.unlinkSync(audioFilename);
});

// 録音を開始する
recorder.startRecording(audioFilename);

const summarize = async () => {
  console.log("録音を停止中...");
  recorder.stopRecording();
  console.log("Summarizing audio...");
  try {
    const transcript = await transcriber.transcribe(audioFilename);
    console.log(transcript);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`filed to transcribe: ${error.message}`);
    } else {
      console.error(`filed to transcribe : ${error}`);
    }
  } finally {
    process.exit();
  }
};
// ctrl+cもしくはctrl+dで録音を停止する
process.on("SIGINT", async () => {
  await summarize();
});

process.on("SIGTERM", async () => {
  await summarize();
});
