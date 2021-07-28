/* Copyright (c) 2020 . All Rights Reserved. */

import { SystemCodeTokenPrimaryKey } from "./system-code-token-primary-key.model";

export class SystemCodeToken {
  systemCode: string;
  systemCodeType: string;
  languageId: number;
  systemCodeDesc1: string;
  systemCodeDesc2: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  systemCodeTokenPrimaryKey: SystemCodeTokenPrimaryKey = new SystemCodeTokenPrimaryKey();

}