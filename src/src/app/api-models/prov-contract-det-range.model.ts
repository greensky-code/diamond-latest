/* Copyright (c) 2020 . All Rights Reserved. */

import {ProvContractDetRangePrimaryKey} from "./prov-contract-det-range-primary-key";

export class ProvContractDetRange {
  provContractDetRangePrimaryKey: ProvContractDetRangePrimaryKey;
  detValueFrom: string;
  detValueTo: string;
  securityCode?: string;
  insertDatetime?: Date;
  insertUser?: string;
  insertProcess?: string;
  updateDatetime?: Date;
  updateUser?: string;
  updateProcess?: string;
  action?: any;
}
