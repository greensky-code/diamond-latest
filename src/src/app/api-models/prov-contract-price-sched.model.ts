/* Copyright (c) 2020 . All Rights Reserved. */

import {ProvContractPriceSchedPrimaryKey} from "./prov-contract-price-sched-primary-key";

export class ProvContractPriceSched {
  provContractPriceSchedPrimaryKeyModel: ProvContractPriceSchedPrimaryKey;
  priceSchedule: string;
  schedPctAllowed: number;
  securityCode?: string;
  insertDatetime?: Date;
  insertUser?: string;
  insertProcess?: string;
  updateDatetime?: Date;
  updateUser?: string;
  updateProcess?: string;
  action?: any;
}
