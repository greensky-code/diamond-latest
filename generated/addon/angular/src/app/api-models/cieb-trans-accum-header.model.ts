/* Copyright (c) 2021 . All Rights Reserved. */

export class CiebTransAccumHeader {
  seqTransId: number;
  seqClaimId: number;
  seqMembId: number;
  seqGroupId: number;
  benefitPackageId: string;
  transType: string;
  processStat: string;
  versionNumber: string;
  borResponseCd: number;
  borResponseDesc: string;
  conversionStatusInd: string;
  initialBalanceLoad: string;
  borMigrationStatusInd: string;
  rebuildInd: string;
  maintenanceLob: string;
  customerSsn: number;
  patientIdentifier: string;
  patientFirstName: string;
  patientLastName: string;
  patientDob: string;
  patientIdSfx: number;
  clientId: number;
  accountNumber: string;
  branch: string;
  benopt: string;
  situsState: string;
  origSysName: string;
  origSysLob: string;
  origSysDate: string;
  origSysTime: string;
  origSysDos: string;
  origSysTransId: string;
  dupChkNum: number;
  origSysClmNetType: string;
  srcSysName: string;
  srcSysLob: string;
  srcSysDate: string;
  srcSysTime: string;
  srcAccumInfoCnt: number;
  pharUmbGrpId: string;
  bhvlUmbGrpId: string;
  relationshipCd: string;
  genderCd: string;
  medClmEngine: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqSubsId: number;
  dmndErrorCd: string;
}