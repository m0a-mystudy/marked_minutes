
import Recorder from './recorder';
import Transcriber from './transcriber';

const recorder = new Recorder();
const transcriber = new Transcriber();

const audioFilename = 'recording.mp3';

// 録音を開始する
recorder.startRecording(audioFilename);

// ユーザーの入力を待って録音を停止する
process.stdin.on('data', async (data) => {
  if (data.toString().trim() === 'stop') {
    console.log('Stopping recording...');
    
    recorder.stopRecording();

    // 音声を転写する
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
    
  }
});

