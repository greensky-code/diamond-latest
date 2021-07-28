/* Copyright (c) 2020 . All Rights Reserved. */

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

import { CapUtilWorkService } from './cap-util-work.service';
import { CapUtilWork } from '../api-models/cap-util-work.model'
import { CapUtilWorks } from "../api-models/testing/fake-cap-util-work.model"

describe('CapUtilWorkService', () => {
  let injector: TestBed;
  let service: CapUtilWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapUtilWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapUtilWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapUtilWorks', () => {
    it('should return an Promise<CapUtilWork[]>', () => {
      const capUtilWork = [
       {seqCcalcId:1234, seqCapUtilWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqClaimId:1234, fileType:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', seqCapElgcntWork:1234, seqCapProvId:1234, seqCapVendId:1234, capEntityCode:'sample data', seqProvId:1234, seqMembId:1234, procedureCode:'sample data', billedAmt:1234, allowedAmt:1234, withholdAmt:1234, netAmt:1234, applicableAmt:1234, claimStatus:'sample data', processingStatus:'sample data', medDefCode:'sample data', postDate:'2018-01-01', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dateReceived:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data', seqCapVendAddress:1234},
       {seqCcalcId:1234, seqCapUtilWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqClaimId:1234, fileType:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', seqCapElgcntWork:1234, seqCapProvId:1234, seqCapVendId:1234, capEntityCode:'sample data', seqProvId:1234, seqMembId:1234, procedureCode:'sample data', billedAmt:1234, allowedAmt:1234, withholdAmt:1234, netAmt:1234, applicableAmt:1234, claimStatus:'sample data', processingStatus:'sample data', medDefCode:'sample data', postDate:'2018-01-01', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dateReceived:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data', seqCapVendAddress:1234},
       {seqCcalcId:1234, seqCapUtilWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqClaimId:1234, fileType:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', seqCapElgcntWork:1234, seqCapProvId:1234, seqCapVendId:1234, capEntityCode:'sample data', seqProvId:1234, seqMembId:1234, procedureCode:'sample data', billedAmt:1234, allowedAmt:1234, withholdAmt:1234, netAmt:1234, applicableAmt:1234, claimStatus:'sample data', processingStatus:'sample data', medDefCode:'sample data', postDate:'2018-01-01', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dateReceived:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data', seqCapVendAddress:1234}

      ];
      service.getCapUtilWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/caputilworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capUtilWork);
    });
  });


  describe('#createCapUtilWork', () => {
    var id = 1;
    it('should return an Promise<CapUtilWork>', () => {
      const capUtilWork: CapUtilWork = {seqCcalcId:1234, seqCapUtilWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqClaimId:1234, fileType:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', seqCapElgcntWork:1234, seqCapProvId:1234, seqCapVendId:1234, capEntityCode:'sample data', seqProvId:1234, seqMembId:1234, procedureCode:'sample data', billedAmt:1234, allowedAmt:1234, withholdAmt:1234, netAmt:1234, applicableAmt:1234, claimStatus:'sample data', processingStatus:'sample data', medDefCode:'sample data', postDate:'2018-01-01', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dateReceived:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data', seqCapVendAddress:1234};
      service.createCapUtilWork(capUtilWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caputilworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapUtilWork', () => {
    var id = 1;
    it('should return an Promise<CapUtilWork>', () => {
      const capUtilWork: CapUtilWork = {seqCcalcId:1234, seqCapUtilWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqClaimId:1234, fileType:'sample data', lineNumber:1234, subLineCode:'sample data', detailSvcDate:'2018-01-01', seqCapElgcntWork:1234, seqCapProvId:1234, seqCapVendId:1234, capEntityCode:'sample data', seqProvId:1234, seqMembId:1234, procedureCode:'sample data', billedAmt:1234, allowedAmt:1234, withholdAmt:1234, netAmt:1234, applicableAmt:1234, claimStatus:'sample data', processingStatus:'sample data', medDefCode:'sample data', postDate:'2018-01-01', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dateReceived:'2018-01-01', companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data', seqCapVendAddress:1234};
      service.updateCapUtilWork(capUtilWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caputilworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapUtilWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapUtilWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caputilworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});