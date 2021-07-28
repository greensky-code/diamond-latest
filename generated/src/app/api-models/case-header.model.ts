/* Copyright (c) 2020 . All Rights Reserved. */

export class CaseHeader {
  seqCaseId: number;
  caseNumber: string;
  assignedRep: string;
  customerTypeCsCode: string;
  customerMasterId: string;
  customerMasterNumber: string;
  customerMasterSubNumber: string;
  customerName: string;
  customerAddr1: string;
  customerAddr2: string;
  customerCity: string;
  customerState: string;
  customerZipCode: string;
  customerPhone1: string;
  phone1DesignCsCode: string;
  customerPhone2: string;
  phone2DesignCsCode: string;
  statusDate: Date;
  statusCsCode: string;
  comments: string;
  userDefined1: string;
  userDefined2: string;
  userDefinedDate: Date;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  caseCompleteFlag: string;
  customerCountry: string;
  memberDateOfBirth: Date;
  memberSocialSecNo: string;
  memberUserDefined2: string;
}