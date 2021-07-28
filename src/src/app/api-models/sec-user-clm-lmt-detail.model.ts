/* Copyright (c) 2020 . All Rights Reserved. */

import { SecUserClmLmtDetailPrimaryKeyModel } from "./security/sec-user-clm-lmt-detail-primary-key-model";

export class SecUserClmLmtDetail {
  userId: string;
  claimType: string;
  holdRelClass: string;
  claimLimit: number;
  determinant: string;
  reasonCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  action:string;
  secUserClmLmtDetailPrimaryKeyModel:SecUserClmLmtDetailPrimaryKeyModel;
  secUserClmLmtDetailPrimaryKey:any;
  existingSecUserClmLmtDetailPrimaryKey:SecUserClmLmtDetailPrimaryKeyModel;
}