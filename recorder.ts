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
    );
  }

  startRecording(filename: string): void {

    // Create write stream.
    const fileStream = fs.createWriteStream(filename, { encoding: "binary" });
    this.audioRecorder.start().stream()?.pipe<any>(fileStream);

  }

  stopRecording(): void {
    this.audioRecorder.stop();
    console.log("Recording stopped.");
  }
}

export default Recorder;
