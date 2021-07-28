/* Copyright (c) 2020 . All Rights Reserved. */

import {PcpaaRulesHdr} from './pcpaa-rules-hdr.model';
import {PcpaaAttrbMaster} from './pcpaa-attrb-master.model';

export class PcpaaRulesDtl {
  ruleId: string;
  seqAttrbId: string;
  urbanToMiles: number;
  ruralToMiles: number;
  operator: string;
  userdefValue: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  pcpaaRulesDtlPrimaryKey: any [];
  pcpaaAttrbMaster: PcpaaAttrbMaster;
  pcpaaRulesHdr: PcpaaRulesHdr;
}