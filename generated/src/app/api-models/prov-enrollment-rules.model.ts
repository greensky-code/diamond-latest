/* Copyright (c) 2020 . All Rights Reserved. */

export class ProvEnrollmentRules {
  seqEnrollmentRule: number;
  seqProvId: number;
  lineOfBusiness: string;
  seqProvAddress: number;
  effectiveDate: Date;
  termDate: Date;
  termReasonCode: string;
  acceptNewPatients: string;
  acceptExistingPatients: string;
  acceptedGender: string;
  acceptedAgeFrom: number;
  acceptedAgeTo: number;
  enrollmentLimitCnt: number;
  currentEnrollmentCnt: number;
  overrideGenderFlag: string;
  overrideAgeFlag: string;
  overrideAccptNewPatFlag: string;
  overrideEnrlLimitFlag: string;
  securityCode: string;
  insertUser: string;
  insertProcess: string;
  insertDatetime: Date;
  updateUser: string;
  updateProcess: string;
  updateDatetime: Date;
  ipaId: string;
  panelId: string;
  availForAutoAssign: string;
  userDefined1: string;
  userDefined2: string;
  pcpaaDatetime: Date;
  userDate1: Date;
  userDate2: Date;
}