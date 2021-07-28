/* Copyright (c) 2020 . All Rights Reserved. */

import { UserDefinedValidateCode } from "./user-defined-validate-code";

export class UserDefinedText {
  winId: string;
  datawindowId: string;
  userDefineTextName: string;
  userDefineText: string;
  userDefineName: string;
  userDefineRequired: string;
  maxLen: number;
  securityCode: string;
  insertDatetime: any;
  insertUser: string;
  insertProcess: string;
  updateDatetime: any;
  updateUser: string;
  updateProcess: string;
  languageId: string;
  userDefineValidateFlag: string;
  validatedTableName: string;
  validatedColumnName: string;
  userDefinedValidateCodes:UserDefinedValidateCode[]=[];
  userDefineNameforDropDown:string;
}