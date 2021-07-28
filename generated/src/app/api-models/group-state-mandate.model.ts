/* Copyright (c) 2020 . All Rights Reserved. */

export class GroupStateMandate {
  seqGpstatId: number;
  seqGroupId: number;
  seqParentId: number;
  levelCode: string;
  mandateType: string;
  operator: string;
  state: string;
  effectiveDate: Date;
  termDate: Date;
  termReason: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}