/* Copyright (c) 2020 . All Rights Reserved. */

import {MemberMaster} from '../member-master.model';
import {MemberEligHistory} from '../member-elig-history.model';
import {GroupMaster} from '../group-master.model';
import {PlanMaster} from '../plan-master.model';

export class AuthMaster {
  authMasterPrimaryKey: { authNumber: number; secondaryAuthNo?: string };
  authNumber: number;
  secondaryAuthNo: string;
  authType: string;
  requestedDate: string;
  seqMembId: number;
  nsSubscriberId: string;
  groupId: string;
  seqGroupId: number;
  planCode: string;
  memberAge: number;
  memberGender: string;
  intakeDateTime: string;
  callerName: string;
  callerPhoneNumber: string;
  patientAcctNo: string;
  medicalRecNo: string;
  admitPrimaryDate: Date;
  estimatedCost: number;
  expirationDate: any;
  diagnosis1: string;
  diagnosis1Text: string;
  diagnosis2: string;
  diagnosis2Text: string;
  diagnosis3: string;
  diagnosis3Text: string;
  surgProcedure1: string;
  procedure1Date: Date;
  surgProcedure2: string;
  procedure2Date: Date;
  surgProcedure3: string;
  procedure3Date: Date;
  reviewType: string;
  reviewer: string;
  firstReviewDate: Date;
  nextReviewDate: Date;
  lateNotification: string;
  serviceAdmitType: string;
  serviceReason: string;
  placeOfService: string;
  medDefCode: string;
  overallStatus: string;
  statusDate: Date;
  holdReason: string;
  diagnosis7: string;
  diagnosis7Text: string;
  diagnosis8: string;
  diagnosis8Text: string;
  diagnosis9: string;
  diagnosis9Text: string;
  surgProcedure4: string;
  procedure4Date: Date;
  surgProcedure5: string;
  procedure5Date: Date;
  surgProcedure6: string;
  procedure6Date: Date;
  diagnosisNarrative: string;
  surgicalProcedureNarrative: string;
  activeDaysVisit: string;
  activeProcedure: string;
  activeAppeal: string;
  tplCode: string;
  billType: string;
  certificationType: string;
  relatedCauseCode: string;
  holdDate: Date;
  closedReason: string;
  closedDate: Date;
  deniedReason: string;
  deniedDate: Date;
  secondOpinionReq: string;
  normDaysVisits: number;
  reqDaysVisits: number;
  authorizedDaysVis: number;
  deniedDaysVis: number;
  authorizedCost: number;
  priorDayAdmit: string;
  dischargeDiagnosis: string;
  dischThruDate: Date;
  outcome: string;
  impact: string;
  disposition: string;
  caseManager: string;
  caseNumber: string;
  caseReferralDate: Date;
  dataGroups: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqEligHist: number;
  seqProvId: number | string;
  authScreenMod: string;
  datesUserDefined1: string;
  datesUserDefined2: string;
  datesUserDefinedDate: Date;
  daysVisitsUserDefined1: string;
  daysVisitsUserDefined2: string;
  daysVisitsUserDefinedDate: Date;
  dischargeUserDefined1: string;
  dischargeUserDefined2: string;
  activePhysicianAdvisor: string;
  activeSecondOpinion: string;
  urMessage: string;
  daysVisitsIndicator: string;
  totalEstCost: number;
  authLevel: string;
  requestedCost: number;
  requestedDays: number;
  caseMgmtSendFlg: number;
  caseMgmtSendTms: Date;
  dischargeUserDefinedDate: Date;
  dxCodesUserDefined1: string;
  dxCodesUserDefined2: string;
  dxCodesUserDefinedDate: Date;
  intakeUserDefined1: string;
  intakeUserDefined2: string;
  intakeUserDefinedDate: Date;
  reviewUserDefined1: string;
  reviewUserDefined2: string;
  reviewUserDefinedDate: Date;
  serviceUserDefined1: string;
  serviceUserDefined2: string;
  serviceUserDefinedDate: Date;
  statusUserDefined1: string;
  statusUserDefined2: string;
  statusUserDefinedDate: Date;
  surgCodesUserDefined1: string;
  surgCodesUserDefined2: string;
  surgCodesUserDefinedDate: Date;
  nsLastName: string;
  nsFirstName: string;
  nsMiddleInitial: string;
  diagnosis4: string;
  diagnosis4Text: string;
  diagnosis5: string;
  diagnosis5Text: string;
  diagnosis6: string;
  diagnosis6Text: string;
  relatedCauseCodeCountry: string;
  relatedCauseCodeState: string;
  releaseInfoCode: string;
  requestCategory: string;
  paperworkAttached: string;
  batchId: string;
  privacyApplied: string;
  providerTrackingNo: string;
  providerEntityId: string;
  clrnghseTrackingNo: string;
  clrnghseEntityId: string;
  responseTrackingNo: string;
  responseEntityId: string;
  processStatus: string;
  memberMaster: MemberMaster;
  memberEligHistory: MemberEligHistory;
  groupMaster: GroupMaster;
  memberEligHistoryPrimaryKey: any;
  planMasterPlanCode: PlanMaster;
  subscriberId:any;
}
