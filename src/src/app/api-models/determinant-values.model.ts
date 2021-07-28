/* Copyright (c) 2020 . All Rights Reserved. */

export class DeterminantValues {
  fileType: string;
  keyword: string;
  seqRuleId: number;
  searchSequence: number;
  determinantSequence: number;
  operator: string;
  valueFrom: string;
  valueThru: string;
  secDeterminantTable: string;
  secDeterminantColumn: string;
  secDeterminantDatatype: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  insertDatetimeDisplay: string;
  updateUser: string;
  updateProcess: string;
  action: string;
  determinantValuesPrimaryKeyModel: {
    determinantSequence: number,
    searchSequence: number,
    seqRuleId: number,
    keyword: string
  };
  determinantValuesPrimaryKey: {
    determinantSequence: number,
    searchSequence: number,
    seqRuleId: number,
    keyword: string
  };
}
