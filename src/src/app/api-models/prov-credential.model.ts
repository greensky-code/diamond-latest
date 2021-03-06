/* Copyright (c) 2020 . All Rights Reserved. */

import { ProvCredentialPrimaryKey } from './prov-credential-primary-key.model';
import { ProvMaster } from './prov-master.model';

export class ProvCredential {
  seqProvCredential: number;
  seqProvId: number;
  provCredentialPrimaryKey: ProvCredentialPrimaryKey = new ProvCredentialPrimaryKey();
  provMaster: ProvMaster;
  license1: string;
  state1: string;
  license1ExpireDt: string;
  license2: string;
  state2: string;
  license2ExpireDt: string;
  deaLicense: string;
  deaExpireDate: string;
  insuranceCarrier1: string;
  insurancePolicy1: string;
  effectiveFrom1: string;
  effectiveTo1: string;
  claimLimit1: number;
  aggregLimit1: number;
  policyDescr1: string;
  insuranceCarrier2: string;
  insurancePolicy2: string;
  effectiveFrom2: string;
  effectiveTo2: string;
  claimLimit2: number;
  aggregateLimit2: number;
  policyDescr2: string;
  userDefined1: string;
  userDefined2: string;
  userDefined3: string;
  userDefined4: string;
  userDefined5: string;
  userDefined6: string;
  userDefined7: string;
  userDefined8: string;
  comments: string;
  medicalSchool: string;
  medSchoolDate: string;
  internship: string;
  internshipDate: string;
  residency: string;
  residencyDate: string;
  specialtyBoard1: string;
  board1FromDate: string;
  board1ToDate: string;
  specialtyBoard2: string;
  board2FromDate: string;
  board2ToDate: string;
  includeInDir: number;
  lastPrintDate: Date;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  country1: string;
  country2: string;
}