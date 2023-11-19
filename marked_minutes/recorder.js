
const fs = require('fs');
const mic = require('mic');
const config = require('./config.json');

class Recorder {
  constructor() {
    this.micInstance = mic({
      rate: config.recording.sampleRate,
      channels: config.recording.channels,
      device: config.recording.device
    });
    this.micInputStream = null;
    this.outputStream = null;
  }

  startRecording(filename) {
    this.micInputStream = this.micInstance.getAudioStream();
    this.outputStream = fs.WriteStream(filename);
    this.micInputStream.pipe(this.outputStream);
    this.micInstance.start();
    console.log('Recording started...');
  }

  stopRecording() {
    this.micInstance.stop();
    console.log('Recording stopped.');
  }
}

module.exports = Recorder;

