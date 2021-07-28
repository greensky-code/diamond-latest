/* Copyright (c) 2020 . All Rights Reserved. */
import {FORM_FIELD_ACTION_TYPES} from "../shared/models/models";

export class MemberContact {
  action?: FORM_FIELD_ACTION_TYPES;
  seqMembId: number;
  contactSource: string;
  primaryDistributionMethod: string;
  emailId: string;
  faxNumber: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  memberContactPrimaryKey?: {
        seqMembId?: number;
        contactSource?:string;
    }
}


