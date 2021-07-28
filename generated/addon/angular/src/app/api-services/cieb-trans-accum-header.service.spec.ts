/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { CiebTransAccumHeaderService } from './cieb-trans-accum-header.service';
import { CiebTransAccumHeader } from '../api-models/cieb-trans-accum-header.model'
import { CiebTransAccumHeaders } from "../api-models/testing/fake-cieb-trans-accum-header.model"

describe('CiebTransAccumHeaderService', () => {
  let injector: TestBed;
  let service: CiebTransAccumHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebTransAccumHeaderService]
    });
    injector = getTestBed();
    service = injector.get(CiebTransAccumHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebTransAccumHeaders', () => {
    it('should return an Promise<CiebTransAccumHeader[]>', () => {
      const ciebTransAccumHeader = [
       {seqTransId:1234, seqClaimId:1234, seqMembId:1234, seqGroupId:1234, benefitPackageId:'sample data', transType:'sample data', processStat:'sample data', versionNumber:'sample data', borResponseCd:1234, borResponseDesc:'sample data', conversionStatusInd:'sample data', initialBalanceLoad:'sample data', borMigrationStatusInd:'sample data', rebuildInd:'sample data', maintenanceLob:'sample data', customerSsn:1234, patientIdentifier:'sample data', patientFirstName:'sample data', patientLastName:'sample data', patientDob:'sample data', patientIdSfx:1234, clientId:1234, accountNumber:'sample data', branch:'sample data', benopt:'sample data', situsState:'sample data', origSysName:'sample data', origSysLob:'sample data', origSysDate:'sample data', origSysTime:'sample data', origSysDos:'sample data', origSysTransId:'sample data', dupChkNum:1234, origSysClmNetType:'sample data', srcSysName:'sample data', srcSysLob:'sample data', srcSysDate:'sample data', srcSysTime:'sample data', srcAccumInfoCnt:1234, pharUmbGrpId:'sample data', bhvlUmbGrpId:'sample data', relationshipCd:'sample data', genderCd:'sample data', medClmEngine:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqSubsId:1234, dmndErrorCd:'sample data'},
       {seqTransId:1234, seqClaimId:1234, seqMembId:1234, seqGroupId:1234, benefitPackageId:'sample data', transType:'sample data', processStat:'sample data', versionNumber:'sample data', borResponseCd:1234, borResponseDesc:'sample data', conversionStatusInd:'sample data', initialBalanceLoad:'sample data', borMigrationStatusInd:'sample data', rebuildInd:'sample data', maintenanceLob:'sample data', customerSsn:1234, patientIdentifier:'sample data', patientFirstName:'sample data', patientLastName:'sample data', patientDob:'sample data', patientIdSfx:1234, clientId:1234, accountNumber:'sample data', branch:'sample data', benopt:'sample data', situsState:'sample data', origSysName:'sample data', origSysLob:'sample data', origSysDate:'sample data', origSysTime:'sample data', origSysDos:'sample data', origSysTransId:'sample data', dupChkNum:1234, origSysClmNetType:'sample data', srcSysName:'sample data', srcSysLob:'sample data', srcSysDate:'sample data', srcSysTime:'sample data', srcAccumInfoCnt:1234, pharUmbGrpId:'sample data', bhvlUmbGrpId:'sample data', relationshipCd:'sample data', genderCd:'sample data', medClmEngine:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqSubsId:1234, dmndErrorCd:'sample data'},
       {seqTransId:1234, seqClaimId:1234, seqMembId:1234, seqGroupId:1234, benefitPackageId:'sample data', transType:'sample data', processStat:'sample data', versionNumber:'sample data', borResponseCd:1234, borResponseDesc:'sample data', conversionStatusInd:'sample data', initialBalanceLoad:'sample data', borMigrationStatusInd:'sample data', rebuildInd:'sample data', maintenanceLob:'sample data', customerSsn:1234, patientIdentifier:'sample data', patientFirstName:'sample data', patientLastName:'sample data', patientDob:'sample data', patientIdSfx:1234, clientId:1234, accountNumber:'sample data', branch:'sample data', benopt:'sample data', situsState:'sample data', origSysName:'sample data', origSysLob:'sample data', origSysDate:'sample data', origSysTime:'sample data', origSysDos:'sample data', origSysTransId:'sample data', dupChkNum:1234, origSysClmNetType:'sample data', srcSysName:'sample data', srcSysLob:'sample data', srcSysDate:'sample data', srcSysTime:'sample data', srcAccumInfoCnt:1234, pharUmbGrpId:'sample data', bhvlUmbGrpId:'sample data', relationshipCd:'sample data', genderCd:'sample data', medClmEngine:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqSubsId:1234, dmndErrorCd:'sample data'}

      ];
      service.getCiebTransAccumHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebTransAccumHeader);
    });
  });


  describe('#createCiebTransAccumHeader', () => {
    var id = 1;
    it('should return an Promise<CiebTransAccumHeader>', () => {
      const ciebTransAccumHeader: CiebTransAccumHeader = {seqTransId:1234, seqClaimId:1234, seqMembId:1234, seqGroupId:1234, benefitPackageId:'sample data', transType:'sample data', processStat:'sample data', versionNumber:'sample data', borResponseCd:1234, borResponseDesc:'sample data', conversionStatusInd:'sample data', initialBalanceLoad:'sample data', borMigrationStatusInd:'sample data', rebuildInd:'sample data', maintenanceLob:'sample data', customerSsn:1234, patientIdentifier:'sample data', patientFirstName:'sample data', patientLastName:'sample data', patientDob:'sample data', patientIdSfx:1234, clientId:1234, accountNumber:'sample data', branch:'sample data', benopt:'sample data', situsState:'sample data', origSysName:'sample data', origSysLob:'sample data', origSysDate:'sample data', origSysTime:'sample data', origSysDos:'sample data', origSysTransId:'sample data', dupChkNum:1234, origSysClmNetType:'sample data', srcSysName:'sample data', srcSysLob:'sample data', srcSysDate:'sample data', srcSysTime:'sample data', srcAccumInfoCnt:1234, pharUmbGrpId:'sample data', bhvlUmbGrpId:'sample data', relationshipCd:'sample data', genderCd:'sample data', medClmEngine:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqSubsId:1234, dmndErrorCd:'sample data'};
      service.createCiebTransAccumHeader(ciebTransAccumHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebTransAccumHeader', () => {
    var id = 1;
    it('should return an Promise<CiebTransAccumHeader>', () => {
      const ciebTransAccumHeader: CiebTransAccumHeader = {seqTransId:1234, seqClaimId:1234, seqMembId:1234, seqGroupId:1234, benefitPackageId:'sample data', transType:'sample data', processStat:'sample data', versionNumber:'sample data', borResponseCd:1234, borResponseDesc:'sample data', conversionStatusInd:'sample data', initialBalanceLoad:'sample data', borMigrationStatusInd:'sample data', rebuildInd:'sample data', maintenanceLob:'sample data', customerSsn:1234, patientIdentifier:'sample data', patientFirstName:'sample data', patientLastName:'sample data', patientDob:'sample data', patientIdSfx:1234, clientId:1234, accountNumber:'sample data', branch:'sample data', benopt:'sample data', situsState:'sample data', origSysName:'sample data', origSysLob:'sample data', origSysDate:'sample data', origSysTime:'sample data', origSysDos:'sample data', origSysTransId:'sample data', dupChkNum:1234, origSysClmNetType:'sample data', srcSysName:'sample data', srcSysLob:'sample data', srcSysDate:'sample data', srcSysTime:'sample data', srcAccumInfoCnt:1234, pharUmbGrpId:'sample data', bhvlUmbGrpId:'sample data', relationshipCd:'sample data', genderCd:'sample data', medClmEngine:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqSubsId:1234, dmndErrorCd:'sample data'};
      service.updateCiebTransAccumHeader(ciebTransAccumHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebTransAccumHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebTransAccumHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebtransaccumheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});