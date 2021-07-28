/* Copyright (c) 2020 . All Rights Reserved. */

import { DeterminantRulesPrimaryKey } from "./determinant-rules-primary-key";

export class  DeterminantRules {
  keyword: string;
  seqRuleId: number;
  ruleOrder: number;
  ruleId: string;
  fileType: string;
  actionCode: string;
  reasonCode: string;
  description: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: any;
  updateUser: string;
  updateProcess: string;
  activeFlag: string;
  effectiveDate: string;
  termDate: string;
  resultValue1: string;
  resultValue2: string;
  resultValue3: string;
  resultValue4: string;
  resultValue5: string;
  resultValue6: string;
  resultValue7: string;
  resultValue8: string;
  resultValue9: string;
  resultValue10: string;
  resultNumber3: number;
  resultNumber4: number;
  resultNumber5: number;
  termReason: string;
  resultNumber1: number;
  resultNumber2: number;
  userDefined1: string;
  userDefined2: string;
  userDate1: string;
  userDate2: string;
  // determinantRulesPrimaryKey: DeterminantRulesPrimaryKey;
  determinantRulesPrimaryKey: {
    seqRuleId?: number;
    keyword?: string;
  };
  insertDatetimeDisplay: string;
  updateDatetimeDisplay: string;
}
