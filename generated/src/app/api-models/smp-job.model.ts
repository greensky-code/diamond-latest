/* Copyright (c) 2020 . All Rights Reserved. */

export class SmpJob {
  id: number;
  owner: string;
  name: string;
  jobtype: number;
  serviceId: string;
  schedule: string;
  machineName: string;
  readonly: number;
  jobDescription: string;
  fixedit: number;
  library: number;
  jobTmpscriptfile: string;
}