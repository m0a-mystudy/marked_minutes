// types/node-audiorecorder.d.ts
declare module 'node-audiorecorder' {
  import { EventEmitter } from 'events';
  import { Writable } from 'stream';

  interface AudioRecorderOptions {
    program?: string;
    device?: string | null;
    driver?: string | null;
    bits?: number;
    channels?: number;
    encoding?: string;
    format?: string;
    rate?: number;
    type?: string;
    silence?: number;
    thresholdStart?: number;
    thresholdStop?: number;
    keepSilence?: boolean;
  }

  interface Logger {
    log(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
  }

  class AudioRecorder extends EventEmitter {
    constructor(options?: AudioRecorderOptions, logger?: Logger);
    start(): this;
    stop(): this;
    stream(): Writable | null;
    on(event: 'close' | 'error' | 'end', listener: (arg?: any) => void): this;
  }

  export = AudioRecorder;
}