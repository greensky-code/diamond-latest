/* Copyright (c) 2020 . All Rights Reserved. */

import { ProvMaster } from '../../api-models/prov-master.model';
import { ConProvGroupDetailPrimaryKey } from '../con-prov-group-detail-primary-key';
import { ReasonCodeMaster } from '../reason-code-master.model';
import { VendorMaster } from '../vendor-master.model';

export class CovProvGroupDetail {
  // covProvGroupDetailPrimaryKey: {
  //   seqCovProvGrp: number;
  //   seqProvId: number;
  // }

  covProvGroupDetailPrimaryKey=new ConProvGroupDetailPrimaryKey;

  // seqCovProvGrp: number;
  // seqProvId: number;
  reimbMethod: string;
  effectiveDate: any;
  termDate: any;
  termReasn: string;
  userDefined1: string;
  userDefined2: string;
  userDefined3: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqDfltVendId: number;
  seqDfltVendAddress: number;
  provMaster=new ProvMaster();
  vendorMaster:VendorMaster;
  reasonCodeMaster:ReasonCodeMaster;
  reimbMethodValue:string;
  // constructor() {
  //   this.covProvGroupDetailPrimaryKey.seqCovProvGrp = null;
  //   this.covProvGroupDetailPrimaryKey.seqProvId = null;

  // }
}
