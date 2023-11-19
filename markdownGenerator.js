
const fs = require('fs');

class MarkdownGenerator {
  constructor() {}

  generateMarkdown(filename, transcript) {
    let markdownContent = `# Transcript\n\n`;

    // Split the transcript into sentences
    const sentences = transcript.split('. ');

    // Add each sentence as a separate line in the markdown file
    sentences.forEach((sentence, index) => {
      markdownContent += `${index + 1}. ${sentence.trim()}\n`;
    });

    // Write the markdown content to a file
    fs.writeFileSync(filename, markdownContent);

    console.log(`Markdown file ${filename} has been generated.`);
  }
}

module.exports = MarkdownGenerator;

