
import Recorder from './recorder';
import Transcriber from './transcriber';

const recorder = new Recorder();
const transcriber = new Transcriber();

const audioFilename = 'recording.mp3';

// 録音を開始する
recorder.startRecording(audioFilename);

// ユーザーの入力を待って録音を停止する
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'stop') {
    console.log('Stopping recording...');
    
    recorder.stopRecording();

    // 音声を転写する
    transcriber.transcribe(audioFilename)
      .then((transcript) => {
        console.log(transcript);
      })
      .catch((error) => {
        console.error(`音声の転写に失敗しました: ${error.message}`);
      }).finally(() => {
        process.exit();
      });
    
  }
});

