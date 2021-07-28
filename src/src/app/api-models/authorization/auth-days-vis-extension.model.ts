/* Copyright (c) 2020 . All Rights Reserved. */

import {ReasonCodeMaster} from '../reason-code-master.model';
import {AuthMaster} from './auth-master.model';

export class AuthDaysVisExtension {
  authNumber: number;
  secondaryAuthNo: string;
  seqDaysVisExt: number;
  daysVisitsExtension: number;
  extensionReason: string;
  extensionDate: String;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  reasonCodeMaster: ReasonCodeMaster;
  authMaster: AuthMaster;
  authDaysVisExtensionPrimaryKey: any;
}
