/* Copyright (c) 2020 . All Rights Reserved. */

export class AgentLicenseHeader {
  seqAgentLicenseHeader: number;
  seqAgentId: number;
  state: string;
  companyCode: string;
  status: string;
  statusDate: Date;
  renewedReason: string;
  renewedDate: Date;
  closedReason: string;
  closedDate: Date;
  deniedReason: string;
  deniedDate: Date;
  holdReason: string;
  holdDate: Date;
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
}