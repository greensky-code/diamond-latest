/* Copyright (c) 2020 . All Rights Reserved. */

export class UserDefinedValdtCodes {
  userDefinedValdtCodesPrimaryKey:any={}
  validatedTableName: string;
  validatedColumnName: string;
  userValidCode: string;
  languageId: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  userValidCodeShortDesc: string;
  userValidCodeLongDesc: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}

export class userValidCodeModel {
  userValidCodeId:string
  userValidCodeName:string;
}