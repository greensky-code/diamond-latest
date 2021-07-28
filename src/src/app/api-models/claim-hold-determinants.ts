import { ClaimHoldDeterminantsPrimaryKey } from "./claim-hold-determinants-primary-key";

export class ClaimHoldDeterminants {
  seqClhldRule: number;
  determinantColumnNo: number;
  determinantTable: string;
  determinant: string;
  operator: string;
  securityCode: string;
  insertDatetime: any;
  insertUser: string;
  insertProcess: string;
  updateDatetime: any;
  updateUser: string;
  updateProcess: string;
  claimHoldDeterminantsPrimaryKey: ClaimHoldDeterminantsPrimaryKey;
  insertDatetimeDisplay: string;
  updateDatetimeDisplay: string;
}
