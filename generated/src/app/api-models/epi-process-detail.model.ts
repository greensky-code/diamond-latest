/* Copyright (c) 2020 . All Rights Reserved. */

export class EpiProcessDetail {
  seqProcessId: number;
  seqSessionId: number;
  seqSourceId: number;
  comments: string;
  startTime: Date;
  endTime: Date;
  status: string;
  returnValue: number;
  unixProcessId: number;
  commandPath: string;
  seqPrevSessionId: number;
  argumentString: string;
}