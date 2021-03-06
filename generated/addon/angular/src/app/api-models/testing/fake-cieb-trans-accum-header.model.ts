/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebTransAccumHeader} from "../../api-models"

var ciebTransAccumHeader1 = new CiebTransAccumHeader();
ciebTransAccumHeader1.seqTransId =123;
ciebTransAccumHeader1.seqClaimId =123;
ciebTransAccumHeader1.seqMembId =123;
ciebTransAccumHeader1.seqGroupId =123;
ciebTransAccumHeader1.benefitPackageId ="sample data1";
ciebTransAccumHeader1.transType ="sample data1";
ciebTransAccumHeader1.processStat ="sample data1";
ciebTransAccumHeader1.versionNumber ="sample data1";
ciebTransAccumHeader1.borResponseCd =123;
ciebTransAccumHeader1.borResponseDesc ="sample data1";
ciebTransAccumHeader1.conversionStatusInd ="sample data1";
ciebTransAccumHeader1.initialBalanceLoad ="sample data1";
ciebTransAccumHeader1.borMigrationStatusInd ="sample data1";
ciebTransAccumHeader1.rebuildInd ="sample data1";
ciebTransAccumHeader1.maintenanceLob ="sample data1";
ciebTransAccumHeader1.customerSsn =123;
ciebTransAccumHeader1.patientIdentifier ="sample data1";
ciebTransAccumHeader1.patientFirstName ="sample data1";
ciebTransAccumHeader1.patientLastName ="sample data1";
ciebTransAccumHeader1.patientDob ="sample data1";
ciebTransAccumHeader1.patientIdSfx =123;
ciebTransAccumHeader1.clientId =123;
ciebTransAccumHeader1.accountNumber ="sample data1";
ciebTransAccumHeader1.branch ="sample data1";
ciebTransAccumHeader1.benopt ="sample data1";
ciebTransAccumHeader1.situsState ="sample data1";
ciebTransAccumHeader1.origSysName ="sample data1";
ciebTransAccumHeader1.origSysLob ="sample data1";
ciebTransAccumHeader1.origSysDate ="sample data1";
ciebTransAccumHeader1.origSysTime ="sample data1";
ciebTransAccumHeader1.origSysDos ="sample data1";
ciebTransAccumHeader1.origSysTransId ="sample data1";
ciebTransAccumHeader1.dupChkNum =123;
ciebTransAccumHeader1.origSysClmNetType ="sample data1";
ciebTransAccumHeader1.srcSysName ="sample data1";
ciebTransAccumHeader1.srcSysLob ="sample data1";
ciebTransAccumHeader1.srcSysDate ="sample data1";
ciebTransAccumHeader1.srcSysTime ="sample data1";
ciebTransAccumHeader1.srcAccumInfoCnt =123;
ciebTransAccumHeader1.pharUmbGrpId ="sample data1";
ciebTransAccumHeader1.bhvlUmbGrpId ="sample data1";
ciebTransAccumHeader1.relationshipCd ="sample data1";
ciebTransAccumHeader1.genderCd ="sample data1";
ciebTransAccumHeader1.medClmEngine ="sample data1";
ciebTransAccumHeader1.insertDatetime =new Date('2010-01-01');
ciebTransAccumHeader1.insertUser ="sample data1";
ciebTransAccumHeader1.insertProcess ="sample data1";
ciebTransAccumHeader1.updateDatetime =new Date('2010-01-01');
ciebTransAccumHeader1.updateUser ="sample data1";
ciebTransAccumHeader1.updateProcess ="sample data1";
ciebTransAccumHeader1.seqSubsId =123;
ciebTransAccumHeader1.dmndErrorCd ="sample data1";

var ciebTransAccumHeader2 = new CiebTransAccumHeader();
ciebTransAccumHeader2.seqTransId =123;
ciebTransAccumHeader2.seqClaimId =123;
ciebTransAccumHeader2.seqMembId =123;
ciebTransAccumHeader2.seqGroupId =123;
ciebTransAccumHeader2.benefitPackageId ="sample data2";
ciebTransAccumHeader2.transType ="sample data2";
ciebTransAccumHeader2.processStat ="sample data2";
ciebTransAccumHeader2.versionNumber ="sample data2";
ciebTransAccumHeader2.borResponseCd =123;
ciebTransAccumHeader2.borResponseDesc ="sample data2";
ciebTransAccumHeader2.conversionStatusInd ="sample data2";
ciebTransAccumHeader2.initialBalanceLoad ="sample data2";
ciebTransAccumHeader2.borMigrationStatusInd ="sample data2";
ciebTransAccumHeader2.rebuildInd ="sample data2";
ciebTransAccumHeader2.maintenanceLob ="sample data2";
ciebTransAccumHeader2.customerSsn =123;
ciebTransAccumHeader2.patientIdentifier ="sample data2";
ciebTransAccumHeader2.patientFirstName ="sample data2";
ciebTransAccumHeader2.patientLastName ="sample data2";
ciebTransAccumHeader2.patientDob ="sample data2";
ciebTransAccumHeader2.patientIdSfx =123;
ciebTransAccumHeader2.clientId =123;
ciebTransAccumHeader2.accountNumber ="sample data2";
ciebTransAccumHeader2.branch ="sample data2";
ciebTransAccumHeader2.benopt ="sample data2";
ciebTransAccumHeader2.situsState ="sample data2";
ciebTransAccumHeader2.origSysName ="sample data2";
ciebTransAccumHeader2.origSysLob ="sample data2";
ciebTransAccumHeader2.origSysDate ="sample data2";
ciebTransAccumHeader2.origSysTime ="sample data2";
ciebTransAccumHeader2.origSysDos ="sample data2";
ciebTransAccumHeader2.origSysTransId ="sample data2";
ciebTransAccumHeader2.dupChkNum =123;
ciebTransAccumHeader2.origSysClmNetType ="sample data2";
ciebTransAccumHeader2.srcSysName ="sample data2";
ciebTransAccumHeader2.srcSysLob ="sample data2";
ciebTransAccumHeader2.srcSysDate ="sample data2";
ciebTransAccumHeader2.srcSysTime ="sample data2";
ciebTransAccumHeader2.srcAccumInfoCnt =123;
ciebTransAccumHeader2.pharUmbGrpId ="sample data2";
ciebTransAccumHeader2.bhvlUmbGrpId ="sample data2";
ciebTransAccumHeader2.relationshipCd ="sample data2";
ciebTransAccumHeader2.genderCd ="sample data2";
ciebTransAccumHeader2.medClmEngine ="sample data2";
ciebTransAccumHeader2.insertDatetime =new Date('2010-01-01');
ciebTransAccumHeader2.insertUser ="sample data2";
ciebTransAccumHeader2.insertProcess ="sample data2";
ciebTransAccumHeader2.updateDatetime =new Date('2010-01-01');
ciebTransAccumHeader2.updateUser ="sample data2";
ciebTransAccumHeader2.updateProcess ="sample data2";
ciebTransAccumHeader2.seqSubsId =123;
ciebTransAccumHeader2.dmndErrorCd ="sample data2";

var ciebTransAccumHeader3 = new CiebTransAccumHeader();
ciebTransAccumHeader3.seqTransId =123;
ciebTransAccumHeader3.seqClaimId =123;
ciebTransAccumHeader3.seqMembId =123;
ciebTransAccumHeader3.seqGroupId =123;
ciebTransAccumHeader3.benefitPackageId ="sample data3";
ciebTransAccumHeader3.transType ="sample data3";
ciebTransAccumHeader3.processStat ="sample data3";
ciebTransAccumHeader3.versionNumber ="sample data3";
ciebTransAccumHeader3.borResponseCd =123;
ciebTransAccumHeader3.borResponseDesc ="sample data3";
ciebTransAccumHeader3.conversionStatusInd ="sample data3";
ciebTransAccumHeader3.initialBalanceLoad ="sample data3";
ciebTransAccumHeader3.borMigrationStatusInd ="sample data3";
ciebTransAccumHeader3.rebuildInd ="sample data3";
ciebTransAccumHeader3.maintenanceLob ="sample data3";
ciebTransAccumHeader3.customerSsn =123;
ciebTransAccumHeader3.patientIdentifier ="sample data3";
ciebTransAccumHeader3.patientFirstName ="sample data3";
ciebTransAccumHeader3.patientLastName ="sample data3";
ciebTransAccumHeader3.patientDob ="sample data3";
ciebTransAccumHeader3.patientIdSfx =123;
ciebTransAccumHeader3.clientId =123;
ciebTransAccumHeader3.accountNumber ="sample data3";
ciebTransAccumHeader3.branch ="sample data3";
ciebTransAccumHeader3.benopt ="sample data3";
ciebTransAccumHeader3.situsState ="sample data3";
ciebTransAccumHeader3.origSysName ="sample data3";
ciebTransAccumHeader3.origSysLob ="sample data3";
ciebTransAccumHeader3.origSysDate ="sample data3";
ciebTransAccumHeader3.origSysTime ="sample data3";
ciebTransAccumHeader3.origSysDos ="sample data3";
ciebTransAccumHeader3.origSysTransId ="sample data3";
ciebTransAccumHeader3.dupChkNum =123;
ciebTransAccumHeader3.origSysClmNetType ="sample data3";
ciebTransAccumHeader3.srcSysName ="sample data3";
ciebTransAccumHeader3.srcSysLob ="sample data3";
ciebTransAccumHeader3.srcSysDate ="sample data3";
ciebTransAccumHeader3.srcSysTime ="sample data3";
ciebTransAccumHeader3.srcAccumInfoCnt =123;
ciebTransAccumHeader3.pharUmbGrpId ="sample data3";
ciebTransAccumHeader3.bhvlUmbGrpId ="sample data3";
ciebTransAccumHeader3.relationshipCd ="sample data3";
ciebTransAccumHeader3.genderCd ="sample data3";
ciebTransAccumHeader3.medClmEngine ="sample data3";
ciebTransAccumHeader3.insertDatetime =new Date('2010-01-01');
ciebTransAccumHeader3.insertUser ="sample data3";
ciebTransAccumHeader3.insertProcess ="sample data3";
ciebTransAccumHeader3.updateDatetime =new Date('2010-01-01');
ciebTransAccumHeader3.updateUser ="sample data3";
ciebTransAccumHeader3.updateProcess ="sample data3";
ciebTransAccumHeader3.seqSubsId =123;
ciebTransAccumHeader3.dmndErrorCd ="sample data3";


export const CiebTransAccumHeaders: CiebTransAccumHeader[] = [
    ciebTransAccumHeader1,
    ciebTransAccumHeader2,
    ciebTransAccumHeader3,
];