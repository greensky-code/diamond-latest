/* Copyright (c) 2020 . All Rights Reserved. */

export class ProvSpecialty {
  provSpecialtyPrimaryKey?: {
    seqProvId: number,
    specialtyType: string
  }
  seqProvId: number;
  specialtyType: string;
  primarySpecialty: string;
  boardStatus: string;
  directoryInclude: string;
  acceptsPatients: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}