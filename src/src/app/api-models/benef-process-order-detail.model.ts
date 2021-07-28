/* Copyright (c) 2020 . All Rights Reserved. */

import { BenefProcessOrderDetailPrimaryKey } from "./benef-process-order-detail-primary-key.model";

export class BenefProcessOrderDetail {
  benefProcessOrderDetailPrimaryKey?: BenefProcessOrderDetailPrimaryKey;
  seqProcessingOrderId: number;
  benefitType: string;
  processingOrder: number;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}