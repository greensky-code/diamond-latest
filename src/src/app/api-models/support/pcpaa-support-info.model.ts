/* Copyright (c) 2020 . All Rights Reserved. */

export class PcpaaSupportInfo {
  seqPcpaaInfoId: number;
  lineOfBusiness: string;
  criteriaType: number;
  specialtyType: string;
  ageFrom: number;
  ageThru: number;
  gender: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  updateDatetimeDisplay?: string;
  insertDatetimeDisplay?: string;
}
