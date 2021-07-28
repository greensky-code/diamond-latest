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

import { CapCputlRptWrkService } from './cap-cputl-rpt-wrk.service';
import { CapCputlRptWrk } from '../api-models/cap-cputl-rpt-wrk.model'
import { CapCputlRptWrks } from "../api-models/testing/fake-cap-cputl-rpt-wrk.model"

describe('CapCputlRptWrkService', () => {
  let injector: TestBed;
  let service: CapCputlRptWrkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapCputlRptWrkService]
    });
    injector = getTestBed();
    service = injector.get(CapCputlRptWrkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapCputlRptWrks', () => {
    it('should return an Promise<CapCputlRptWrk[]>', () => {
      const capCputlRptWrk = [
       {seqCapCputlRptWrk:1234, seqJobId:1234, capModelId:'sample data', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', capPoolId:'sample data', medDefCode:'sample data', medDefDesc:'sample data', capCreditAmt:1234, capMedCostAmt:1234, capStoplossAmt:1234, capOtherAdjAmt:1234, capWithholdAmt:1234, capCapFfsAmt:1234, capUnitCount:1234, capModelPmpm:1234, capPcpPmpm:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'},
       {seqCapCputlRptWrk:1234, seqJobId:1234, capModelId:'sample data', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', capPoolId:'sample data', medDefCode:'sample data', medDefDesc:'sample data', capCreditAmt:1234, capMedCostAmt:1234, capStoplossAmt:1234, capOtherAdjAmt:1234, capWithholdAmt:1234, capCapFfsAmt:1234, capUnitCount:1234, capModelPmpm:1234, capPcpPmpm:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'},
       {seqCapCputlRptWrk:1234, seqJobId:1234, capModelId:'sample data', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', capPoolId:'sample data', medDefCode:'sample data', medDefDesc:'sample data', capCreditAmt:1234, capMedCostAmt:1234, capStoplossAmt:1234, capOtherAdjAmt:1234, capWithholdAmt:1234, capCapFfsAmt:1234, capUnitCount:1234, capModelPmpm:1234, capPcpPmpm:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'}

      ];
      service.getCapCputlRptWrks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrptwrks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capCputlRptWrk);
    });
  });


  describe('#createCapCputlRptWrk', () => {
    var id = 1;
    it('should return an Promise<CapCputlRptWrk>', () => {
      const capCputlRptWrk: CapCputlRptWrk = {seqCapCputlRptWrk:1234, seqJobId:1234, capModelId:'sample data', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', capPoolId:'sample data', medDefCode:'sample data', medDefDesc:'sample data', capCreditAmt:1234, capMedCostAmt:1234, capStoplossAmt:1234, capOtherAdjAmt:1234, capWithholdAmt:1234, capCapFfsAmt:1234, capUnitCount:1234, capModelPmpm:1234, capPcpPmpm:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'};
      service.createCapCputlRptWrk(capCputlRptWrk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrptwrks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapCputlRptWrk', () => {
    var id = 1;
    it('should return an Promise<CapCputlRptWrk>', () => {
      const capCputlRptWrk: CapCputlRptWrk = {seqCapCputlRptWrk:1234, seqJobId:1234, capModelId:'sample data', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', capPoolId:'sample data', medDefCode:'sample data', medDefDesc:'sample data', capCreditAmt:1234, capMedCostAmt:1234, capStoplossAmt:1234, capOtherAdjAmt:1234, capWithholdAmt:1234, capCapFfsAmt:1234, capUnitCount:1234, capModelPmpm:1234, capPcpPmpm:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data'};
      service.updateCapCputlRptWrk(capCputlRptWrk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrptwrks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapCputlRptWrk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapCputlRptWrk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcputlrptwrks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});