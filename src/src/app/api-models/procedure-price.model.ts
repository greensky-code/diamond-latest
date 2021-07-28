/* Copyright (c) 2020 . All Rights Reserved. */
import{ProcedurePricePrimaryKey} from './procedure-price-primary-key.model'

export class ProcedurePrice {
  procedureCode: string;
  seqProcPrice: number;
  priceSchedule: string;
  pricingRegion: string;
  effectiveDate: string;
  termDate: string;
  allowedAmt: number;
  pctOfBilled: number;
  withholdPct: number;
  contractOverride: string;
  procedureHold: string;
  holdDate: string;
  perDiemFlag: string;
  userDefined1: string;
  userDefined2: string;
  userDefined3: string;
  userDefined4: string;
  userDefined5: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  modifierCode: string;
  geoZipRegion: string;
  procedurePricePrimaryKey: ProcedurePricePrimaryKey;
}