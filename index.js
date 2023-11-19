
const Recorder = require('./recorder.js');
const Transcriber = require('./transcriber.js');
const MarkdownGenerator = require('./markdownGenerator.js');

const recorder = new Recorder();
const transcriber = new Transcriber();
const markdownGenerator = new MarkdownGenerator();

const audioFilename = 'recording.wav';
const markdownFilename = 'transcript.md';

// Start recording
recorder.startRecording(audioFilename);

// Wait for user input to stop recording
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'stop') {
    recorder.stopRecording();

    // Transcribe the audio
    transcriber.transcribe(audioFilename)
      .then((transcript) => {
        // Generate markdown
        markdownGenerator.generateMarkdown(markdownFilename, transcript);
      })
      .catch((error) => {
        console.error(`Failed to transcribe audio: ${error.message}`);
      });
  }
});

