/* Copyright (c) 2020 . All Rights Reserved. */

export class DeterminantTables {
  keyword: string;
  seqRuleId: number;
  searchSequence: number;
  determinantTable: string;
  determinantColumn: string;
  determinantDatatype: string;
  subsInd: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  determinantTablesPrimaryKey: {
    searchSequence: number;
    seqRuleId: number;
    keyword: string;
  };
}