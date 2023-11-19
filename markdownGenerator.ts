
import fs from 'fs';

class MarkdownGenerator {
  constructor() {}

  generateMarkdown(filename: string, transcript: string): void {
    let markdownContent = `# Transcript\n\n`;

    // トランスクリプトを文に分割する
    const sentences = transcript.split('. ');

    // 各文をマークダウンファイルの別の行として追加する
    sentences.forEach((sentence, index) => {
      markdownContent += `${index + 1}. ${sentence.trim()}\n`;
    });

    // マークダウンの内容をファイルに書き込む
    fs.writeFileSync(filename, markdownContent);

    console.log(`Markdownファイル ${filename} が生成されました。`);
  }
}

export default MarkdownGenerator;

