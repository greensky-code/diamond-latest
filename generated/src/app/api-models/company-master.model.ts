/* Copyright (c) 2020 . All Rights Reserved. */

export class CompanyMaster {
  companyCode: string;
  description: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  faxNumber: string;
  medicalPayAcct: string;
  capPayAcct: string;
  tradePayAcct: string;
  irsTaxId: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  manMedPayAcct: string;
  manCapPayAcct: string;
  country: string;
  vendorMinCheck: number;
  subscriberMinCheck: number;
  agentCommissionPayAcct: string;
  userDefined1: string;
}