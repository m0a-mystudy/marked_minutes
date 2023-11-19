
import fs from 'fs';
import mic from 'mic';
import config from './config.json';

class Recorder {
  private micInstance: any;
  private micInputStream: any;
  private outputStream: any;

  constructor() {
    this.micInstance = mic({
      rate: config.recording.sampleRate,
      channels: config.recording.channels,
      device: config.recording.device
    });
    this.micInputStream = null;
    this.outputStream = null;
  }

  startRecording(filename: string): void {
    this.micInputStream = this.micInstance.getAudioStream();
    this.outputStream = fs.createWriteStream(filename);
    this.micInputStream.pipe(this.outputStream);
    this.micInstance.start();
    console.log('Recording started...');
  }

  stopRecording(): void {
    this.micInstance.stop();
    console.log('Recording stopped.');
  }
}

export default Recorder;

