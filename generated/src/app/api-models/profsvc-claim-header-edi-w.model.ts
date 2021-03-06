/* Copyright (c) 2020 . All Rights Reserved. */

export class ProfsvcClaimHeaderEdiW {
  seqPrediId: number;
  seqClaimId: number;
  claimNumber: string;
  lineNumber: number;
  primarySvcDate: Date;
  claimThruDate: Date;
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
  eligibleThruDate: Date;
  eligStatus: string;
  seqProvId: number;
  seqProvAddress: number;
  providerParStat: string;
  providerType: string;
  providerSpec: string;
  providerIpaId: string;
  providerPcpFlag: string;
  seqRefProvId: number;
  refProvType: string;
  refProvSpec: string;
  refProvParStat: string;
  refProvIpaId: string;
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
  dateReceived: Date;
  userDefined1: string;
  userDefined2: string;
  batchNumber: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqProvContract: number;
  paySubscriber: string;
  memberLastName: string;
  memberFirstName: string;
  memberDateOfBirth: Date;
  memberSocialSecNo: string;
  subscriberId: string;
  personNumber: string;
  extProvId: string;
  extProvIdType: string;
  extVendId: string;
  extVendIdType: string;
  extRefProvId: string;
  extRefProvIdType: string;
  ediStatus: string;
  originalClaimNumber: string;
  recInd: string;
  submittedAuthNumber: number;
  submittedSecondaryAuth: string;
  covProvFlag: string;
  seqCovProvParent: number;
  reimbMethod: string;
  coveringMethod: string;
  authWaiveMethod: string;
  providerPanel: string;
  providerIpa: string;
  authClass: string;
  refProvPcp: string;
  unableToWorkBeginDate: Date;
  unableToWorkThruDate: Date;
  reservedLocalUseHdr: string;
  outsideLabInd: string;
  outsideLabCharges: number;
  medicaidResubmitCode: string;
  originalReferenceNumber: string;
  patientPaidAmount: number;
  facilityNumber: string;
  labNumber: string;
  autoAccidentInd: string;
  autoAccidentState: string;
  releaseMedRecsInd: string;
  onsetTime: number;
  otherInsuranceInd: string;
  assignOfBenefits: string;
  emplRelatedInd: string;
  accidentInd: string;
  accidentSymptomDate: Date;
  patControlNo: string;
  provAssignInd: string;
  sameSimilarSymptomInd: string;
  sameSimilarSymptomDate: Date;
  admissionDate1: Date;
  dischargeDate1: Date;
  diamondId: string;
  inServiceArea: string;
  providerPostalCode: string;
  primaryOcExists: string;
  relInfoSign: string;
}