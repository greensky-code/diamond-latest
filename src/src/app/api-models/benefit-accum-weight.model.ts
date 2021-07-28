/* Copyright (c) 2020 . All Rights Reserved. */

import { BenefitAccumWeightDetail } from "./benefit-accum-weight-detail.model";

export class BenefitAccumWeight {
  accumulatorId: string;
  description: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  benefitAccumWeightDetails?: BenefitAccumWeightDetail[];
}