import fs from "fs";
import AudioRecorder from "node-audiorecorder";

class Recorder {
  private audioRecorder: AudioRecorder;

  constructor() {
    this.audioRecorder = new AudioRecorder(
      {
        program: "sox",
        silence: 0,
        format: "mp3",
      },
      console
    );
    this.audioRecorder.on("error", function () {
      console.warn("Recording error.");
    });
    this.audioRecorder.on("end", function () {
      console.warn("Recording ended.");
    });
  }

  startRecording(filename: string): void {
    console.log("Writing new recording file at:", filename);

    // Create write stream.
    const fileStream = fs.createWriteStream(filename, { encoding: "binary" });
    this.audioRecorder.start().stream()?.pipe<any>(fileStream);

    console.log("Recording started...");
  }

  stopRecording(): void {
    this.audioRecorder.stop();
    console.log("Recording stopped.");
  }
}

export default Recorder;
