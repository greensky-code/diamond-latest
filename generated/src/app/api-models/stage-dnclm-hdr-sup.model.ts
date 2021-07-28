/* Copyright (c) 2020 . All Rights Reserved. */

export class StageDnclmHdrSup {
  batchId: string;
  transactionId: number;
  claimStatus: string;
  processingStatus: string;
  seqMembId: number;
  memberAge: number;
  memberGender: string;
  seqPcpId: number;
  pcpProvId: string;
  pcpIpaId: string;
  pcpType: string;
  pcpSpec: string;
  seqGroupId: number;
  groupId: string;
  planCode: string;
  eligibleEffDate: Date;
  eligibleThruDate: Date;
  lob: string;
  panelId: string;
  riderString: string;
  primaryOcExists: string;
  eligStatus: string;
  eligStatParamResult: string;
  seqProvId: number;
  seqProvAddress: number;
  seqProvContract: number;
  provParStat: string;
  provType: string;
  provSpec: string;
  provIpaId: string;
  provPcpFlag: string;
  provPanel: string;
  provIpa: string;
  seqRefProvId: number;
  refProvParStat: string;
  refProvType: string;
  refProvSpec: string;
  refProvIpaId: string;
  refProvPcp: string;
  seqVendId: number;
  seqVendAddress: number;
  submittedAuthNo: number;
  submittedSecAuthNo: string;
  covProvFlag: string;
  seqCovProvParent: number;
  reimbMethod: string;
  authClass: string;
  authWaiveMethod: string;
  authLevel: string;
  inSvcArea: string;
  acceptMedicareAssignFlag: string;
  seqDefaultVendId: number;
  seqDefaultVendAddr: number;
  seqPaySubVendId: number;
  seqPaySubVendAddrId: number;
  authMatchOrder: number;
  coveringMethod: string;
  facilityLabIdNo: string;
  authClaimMatchInd: string;
  authClaimMatchDaysBefore: number;
  authClaimMatchDaysAfter: number;
  participationFlag: string;
  parRsnCode: string;
  nonParRsnCode: string;
  bmaParamParvalue: string;
  seqMembOthCov: number;
  apiSuppressEob: string;
  batchNo: string;
  seqSubsId: number;
  membrMstrHoldRsn: string;
  membrMstrHoldDate: Date;
  invalidFlags: string;
  apiProvcontract: string;
  waiveMatchOrder: string;
  privacyApplies: string;
  seqMcondId: number;
  diagnosis1: string;
  diagnosis2: string;
  diagnosis3: string;
  diagnosis4: string;
  diagnosis5: string;
  diagnosis6: string;
  diagnosis7: string;
  diagnosis8: string;
}