
const fs = require('fs');
const axios = require('axios');
const config = require('./config.json');

class Transcriber {
  constructor() {
    this.apiKey = config.openai.api_key;
    this.endpoint = config.openai.endpoint;
  }

  async transcribe(filename) {
    const audioData = fs.readFileSync(filename);
    const response = await axios.post(this.endpoint, {
      audio: {
        data: audioData
      }
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error(`Failed to transcribe audio: ${response.statusText}`);
    }

    return response.data.transcript;
  }
}

module.exports = Transcriber;
