/* Copyright (c) 2020 . All Rights Reserved. */

import {ProvMaster} from '../prov-master.model';

export class AuthAppeal {
  authNumber: number;
  secondaryAuthNo: string;
  seqAuthAppeal: number;
  appealNumber: string;
  appellant: string;
  seqProvId: number;
  contactDate: string;
  decisionDate: string;
  advisorDecision: string;
  notificationDate: string;
  comments: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  provMaster: ProvMaster;
  authAppealPrimaryKey: any;

}