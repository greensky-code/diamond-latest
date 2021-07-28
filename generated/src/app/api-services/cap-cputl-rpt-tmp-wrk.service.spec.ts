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

import { CapCputlRptTmpWrkService } from './cap-cputl-rpt-tmp-wrk.service';
import { CapCputlRptTmpWrk } from '../api-models/cap-cputl-rpt-tmp-wrk.model'
import { CapCputlRptTmpWrks } from "../api-models/testing/fake-cap-cputl-rpt-tmp-wrk.model"

describe('CapCputlRptTmpWrkService', () => {
  let injector: TestBed;
  let service: CapCputlRptTmpWrkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapCputlRptTmpWrkService]
    });
    injector = getTestBed();
    service = injector.get(CapCputlRptTmpWrkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapCputlRptTmpWrks', () => {
    it('should return an Promise<CapCputlRptTmpWrk[]>', () => {
      const capCputlRptTmpWrk = [
       {provId:1234, vendId:1234, seqCapPoolId:1234, seqClaimId:1234, claimFileType:'sample data', seqGroupId:1234, applyTo:'sample data', capEntityCode:'sample data', capTransAmt:1234, pmpmWithholdAmt:1234, seqCapCputlRptTmpWrk:1234, seqMembId:1234, capMonth:'2018-01-01', adjustmentFlag:'sample data'},
       {provId:1234, vendId:1234, seqCapPoolId:1234, seqClaimId:1234, claimFileType:'sample data', seqGroupId:1234, applyTo:'sample data', capEntityCode:'sample data', capTransAmt:1234, pmpmWithholdAmt:1234, seqCapCputlRptTmpWrk:1234, seqMembId:1234, capMonth:'2018-01-01', adjustmentFlag:'sample data'},
       {provId:1234, vendId:1234, seqCapPoolId:1234, seqClaimId:1234, claimFileType:'sample data', seqGroupId:1234, applyTo:'sample data', capEntityCode:'sample data', capTransAmt:1234, pmpmWithholdAmt:1234, seqCapCputlRptTmpWrk:1234, seqMembId:1234, capMonth:'2018-01-01', adjustmentFlag:'sample data'}

      ];
      service.getCapCputlRptTmpWrks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrpttmpwrks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capCputlRptTmpWrk);
    });
  });


  describe('#createCapCputlRptTmpWrk', () => {
    var id = 1;
    it('should return an Promise<CapCputlRptTmpWrk>', () => {
      const capCputlRptTmpWrk: CapCputlRptTmpWrk = {provId:1234, vendId:1234, seqCapPoolId:1234, seqClaimId:1234, claimFileType:'sample data', seqGroupId:1234, applyTo:'sample data', capEntityCode:'sample data', capTransAmt:1234, pmpmWithholdAmt:1234, seqCapCputlRptTmpWrk:1234, seqMembId:1234, capMonth:'2018-01-01', adjustmentFlag:'sample data'};
      service.createCapCputlRptTmpWrk(capCputlRptTmpWrk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrpttmpwrks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapCputlRptTmpWrk', () => {
    var id = 1;
    it('should return an Promise<CapCputlRptTmpWrk>', () => {
      const capCputlRptTmpWrk: CapCputlRptTmpWrk = {provId:1234, vendId:1234, seqCapPoolId:1234, seqClaimId:1234, claimFileType:'sample data', seqGroupId:1234, applyTo:'sample data', capEntityCode:'sample data', capTransAmt:1234, pmpmWithholdAmt:1234, seqCapCputlRptTmpWrk:1234, seqMembId:1234, capMonth:'2018-01-01', adjustmentFlag:'sample data'};
      service.updateCapCputlRptTmpWrk(capCputlRptTmpWrk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrpttmpwrks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapCputlRptTmpWrk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapCputlRptTmpWrk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrpttmpwrks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});