/* Copyright (c) 2020 . All Rights Reserved. */

import { AuthSecondOpinionPrimaryKey } from "../auth-second-opinion-primary-key";
import { ProvMaster } from "../prov-master.model";

export class AuthSecondOpinion {
  authNumber: number;
  secondaryAuthNo: string;
  seqSecondOp: number;
  seqProvId: number;
  secondOpinionDate: any;
  secondOpinion: string;
  decision: string;
  comments: string;
  status: string;
  statusReason: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  provMaster:ProvMaster;
  authSecondOpinionPrimaryKey:AuthSecondOpinionPrimaryKey;
}