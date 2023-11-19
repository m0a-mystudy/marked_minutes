
import Recorder from './recorder';
import Transcriber from './transcriber';
import MarkdownGenerator from './markdownGenerator';

const recorder = new Recorder();
const transcriber = new Transcriber();
const markdownGenerator = new MarkdownGenerator();

const audioFilename = 'recording.wav';
const markdownFilename = 'transcript.md';

// 録音を開始する
recorder.startRecording(audioFilename);

// ユーザーの入力を待って録音を停止する
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'stop') {
    recorder.stopRecording();

    // 音声を転写する
    transcriber.transcribe(audioFilename)
      .then((transcript) => {
        // マークダウンを生成する
        markdownGenerator.generateMarkdown(markdownFilename, transcript);
      })
      .catch((error) => {
        console.error(`音声の転写に失敗しました: ${error.message}`);
      });
  }
});

