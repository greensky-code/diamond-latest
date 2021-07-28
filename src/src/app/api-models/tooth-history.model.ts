/* Copyright (c) 2020 . All Rights Reserved. */

import {ProvMaster} from './prov-master.model';

export class ToothHistory {
  seqToothHistoryId: number;
  seqMembId: number;
  dateOfService: string;
  toothNumber: string;
  procedureCode: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
  arch: string;
  quadrant: string;
  oralCavity: string;
  toothStatus: string;
  seqProvId: number;
  benefitPackageId: string;
  seqClaimId: number;
  lineNumber: number;
  subLineCode: string;
  sourceType: string;
  userDefined1: string;
  userDate1: string;
  userDefined2: string;
  userDate2: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  medDefCode: string;
  providerId: string;
  provMaster: ProvMaster;
}
