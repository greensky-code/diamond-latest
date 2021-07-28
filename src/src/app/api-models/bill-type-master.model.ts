/* Copyright (c) 2020 . All Rights Reserved. */

export class BillTypeMaster {
  billType: string;
  description: string;
  inpOutpInd: string;
  placeOfSvcMaster: {
    description: string;
    placeOfSvcCode: string;
    securityCode: string;
  };
  placeOfService:string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  insertDatetimeDisplay: string;
  updateDatetimeDisplay: string;
}