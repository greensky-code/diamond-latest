/* Copyright (c) 2020 . All Rights Reserved. */

export class InstClaimHeader {
  seqClaimId: number;
  claimNumber: string;
  primarySvcDate: string;
  claimThruDate: string;
  authNumber: number;
  secondaryAuth: string;
  seqMembId: number;
  memberAge: number;
  memberGender: string;
  seqPcpId: number;
  pcpType: string;
  pcpSpec: string;
  pcpIpaId: string;
  seqGroupId: number;
  planCode: string;
  lineOfBusiness: string;
  panelId: string;
  riderString: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqProvContract: number;
  paySubscriber: string;
  submittedAuthNumber: number;
  submittedSecondaryAuth: string;
  coveredDays: string;
  coinsuranceDays: string;
  lifetimeReserveDays: string;
  admissionDate: string;
  dischargeHour: string;
  assignmentOfBenefits: string;
  remarks: string;
  pricerBaseReimbAmt: number;
  pricerOutlierPayments: number;
  pricerAltLevelCarePayments: number;
  pricerTotalReimbAmt: number;
  pricerOutlierType: number;
  pricerAverageLos: number;
  noncoveredDays: string;
  medicalRelease: string;
  occurrence6: string;
  occurrence6Date: Date;
  occurrence7: string;
  occurrence7Date: Date;
  occurrence8: string;
  occurrence8Date: Date;
  occur2SpanCode: string;
  occur2SpanFrom: Date;
  occur2SpanThru: Date;
  value4Code: string;
  value4Amt: number;
  value5Code: string;
  value5Amt: number;
  value6Code: string;
  value6Amt: number;
  value7Code: string;
  value7Amt: number;
  value8Code: string;
  value8Amt: number;
  value9Code: string;
  value9Amt: number;
  value10Code: string;
  value10Amt: number;
  value11Code: string;
  value11Amt: number;
  value12Code: string;
  value12Amt: number;
  stateUnlabeled5: string;
  stateUnlabeled6: string;
  stateUnlabeled7: string;
  stateUnlabeled8: string;
  ocCarrierCode: string;
  cobAlwdAmtRule: string;
  cobAlwdAmtRsn: string;
  authLevel: string;
  authWaiveMethod: string;
  providerPanel: string;
  providerIpa: string;
  authClass: string;
  attProvPcp: string;
  authMatchOrder: number;
  seqDfltVendId: number;
  seqDfltVendAddress: number;
  seqPaySubVendId: number;
  seqPaySubVendAddrId: number;
  acceptMedicareAssignFlag: string;
  explanationAttached: string;
  inServiceArea: string;
  providerPostalCode: string;
  headerChanged: string;
  primaryOcExists: string;
  actualAdmissionDate: Date;
  payDependent: string;
  auditStatus: string;
  originalReferenceNumber: string;
  invalidDataInd: string;
  privacyApplies: string;
  seqMcondId: number;
  homeHealthCertifFormNum1: string;
  homeHealthCertifFormNum2: string;
  homehsFromDate: Date;
  homehsCertifDatePeriodStrt: Date;
  homehsCertifDatePeriodEnd: Date;
  homehsPrincipalDxDate: Date;
  homehsSnfInd: string;
  homehsMedicareCovInd: string;
  homehsMedicareCertifType: string;
  homehsSurgeryPerfDate: Date;
  homehsSurgProcCodeQualId: string;
  homehsSurgeryProcCode: string;
  homehsPhyscOrderDate: Date;
  eligibleThruDate: Date;
  eligStatus: string;
  seqProvId: number;
  seqProvAddress: number;
  providerParStat: string;
  providerId: string;
  providerShortName: string;
  providerType: string;
  providerSpec: string;
  providerIpaId: string;
  providerPcpFlag: string;
  seqAdmProvId: number;
  admProvShortName: string;
  admProvType: string;
  admProvSpec: string;
  admProvParStat: string;
  admProvIpaId: string;
  seqAttProvId: number;
  attProvShortName: string;
  attProvType: string;
  attProvSpec: string;
  attProvParStat: string;
  attProvIpaId: string;
  seqVendId: number;
  seqVendAddress: number;
  totalBilledAmt: number;
  placeOfService1: string;
  placeOfService2: string;
  placeOfService3: string;
  serviceReason1: string;
  diagnosis1: string;
  diagnosis2: string;
  diagnosis3: string;
  diagnosis4: string;
  diagnosis5: string;
  diagnosis6: string;
  diagnosis7: string;
  diagnosis8: string;
  diagnosis9: string;
  dateReceived: string;
  userDefined1: string;
  userDefined2: string;
  batchNumber: string;
  readmitContinueFl: string;
  patientControlNo: string;
  billType: string;
  drgCode: string;
  mdcCode: string;
  patientStatus: string;
  birthWeight: number;
  admitHour: number;
  admitType: string;
  admitSource: string;
  ageInDaysAdmit: number;
  ageInDaysDisch: number;
  medicalRecordNo: string;
  admittingDiagnosis: string;
  icd9Code: string;
  hcpcsRate: string;
  occurrence1: string;
  occurrence1Date: Date;
  occurrence2: string;
  occurrence2Date: Date;
  occurrence3: string;
  occurrence3Date: Date;
  occurrence4: string;
  occurrence4Date: Date;
  occurrence5: string;
  occurrence5Date: Date;
  occurSpanCode: string;
  occurSpanFrom: Date;
  occurSpanThru: Date;
  conditionCode1: string;
  conditionCode2: string;
  conditionCode3: string;
  conditionCode4: string;
  conditionCode5: string;
  conditionCode6: string;
  conditionCode7: string;
  value1Code: string;
  value1Amt: number;
  value2Code: string;
  value2Amt: number;
  value3Code: string;
  value3Amt: number;
  procCodingMethod: string;
  procedure1Code: string;
  procedure1Date: Date;
  procedure2Code: string;
  procedure2Date: Date;
  procedure3Code: string;
  procedure3Date: Date;
  procedure4Code: string;
  procedure4Date: Date;
  procedure5Code: string;
  procedure5Date: Date;
  procedure6Code: string;
  procedure6Date: Date;
  seqOtherProvId: number;
  valueLine1: string;
  valueLine2: string;
  stateUnlabeled1: string;
  stateUnlabeled2: string;
  stateUnlabeled3: string;
  stateUnlabeled4: string;
  natlUnlabeled1: string;
  natlUnlabeled2: string;
  natlUnlabeled3: string;
  natlUnlabeled4: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  homehsPhyscLastVisitDate: Date;
  homehsPhyscLastContactDate: Date;
  homehsInpatAdmisDatePer: Date;
  homehsInpatDischgDatePer: Date;
  homehsPatientDischgFacCode: string;
  homehsSecondaryDxDate1: Date;
  homehsSecondaryDxDate2: Date;
  homehsSecondaryDxDate3: Date;
  homehsSecondaryDxDate4: Date;
  homehsFunctionalResponsCode: string;
  homehsFunctionalCode1: string;
  homehsFunctionalCode2: string;
  homehsFunctionalCode3: string;
  homehsFunctionalCode4: string;
  homehsFunctionalCode5: string;
  homehsActivPermRespCode: string;
  homehsActivityPermitCode1: string;
  homehsActivityPermitCode2: string;
  homehsActivityPermitCode3: string;
  homehsActivityPermitCode4: string;
  homehsActivityPermitCode5: string;
  homehsMentalStatusCode: string;
  homehsMentalStatusCode1: string;
  homehsMentalStatusCode2: string;
  homehsMentalStatusCode3: string;
  homehsMentalStatusCode4: string;
  homehsMentalStatusCode5: string;
  homehsPrognosisCode: string;
  seqOperPhysProvId: number;
  paperEob: string;
  provSignOnFile: string;
  memberState: string;
  pricerTraumaInd: number;
  pricerCongenMalfInd: number;
  pricerShortLosTrim: number;
  pricerLongLosTrim: number;
  pricerNewAvgLos: number;
  pricerDrgWeight: number;
  pricerCrfInd: number;
  pricerLdiem: number;
  pricerTrfInd: number;
  pricerPayMethod: number;
  memberId: any;
  vendorId: any;
  guCat: any;
  guCatEffDate: any;
  groupName: any;
  groupState: any;
  memberMaster: any;
  groupMaster: any;
  vendorMaster: any;
  provMaster: any;
  personNumber: string;
}
