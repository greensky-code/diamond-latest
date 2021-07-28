/* Copyright (c) 2020 . All Rights Reserved. */

export class AuthProcedureRangeValue {
  authProcRangeId: string;
  fromRange: string;
  thruRange: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  description: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  action: string;
  authProcedureRangeValuePrimaryKey: {authProcRangeId: string, fromRange: string};
  authProcedureRangeValuePrimaryKeyModel: {authProcRangeId: string, fromRange: string};
}
