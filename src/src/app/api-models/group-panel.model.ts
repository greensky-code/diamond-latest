/* Copyright (c) 2020 . All Rights Reserved. */

import { FORM_FIELD_ACTION_TYPES } from "../shared/models/models";

export class GroupPanel {
  action?: FORM_FIELD_ACTION_TYPES;
  seqGroupPanel: number;
  seqGroupId: number;
  panelId: string;
  planCode: string;
  effectiveDate: string;
  termDate: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  groupPanelPrimaryKey:{
      seqGroupPanel?: number;
      seqGroupId: number;
  };
  groupPanel:{
    panelId:number
  };
  groupMaster:{
    seqGroupId:number
  }
}