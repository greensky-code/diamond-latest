/* Copyright (c) 2020 . All Rights Reserved. */

import { SecColDetailPrimaryKey } from "../sec-col-detail-primary-key";


export class SecColDetail {
  functionalArea: string;
  securityInd: string;
  securityCode: string;
  insertDatetime: any;
  insertUser: string;
  insertProcess: string;
  updateDatetime: any;
  updateUser: string;
  updateProcess: string;
  secColDetailPrimaryKey: SecColDetailPrimaryKey;
  action:string;
  secColMaster: null;
  sfldlId:string;
  columnName:string;
  tableName:string;
}
