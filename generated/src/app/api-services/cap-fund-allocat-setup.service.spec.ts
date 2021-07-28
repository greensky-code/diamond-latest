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

import { CapFundAllocatSetupService } from './cap-fund-allocat-setup.service';
import { CapFundAllocatSetup } from '../api-models/cap-fund-allocat-setup.model'
import { CapFundAllocatSetups } from "../api-models/testing/fake-cap-fund-allocat-setup.model"

describe('CapFundAllocatSetupService', () => {
  let injector: TestBed;
  let service: CapFundAllocatSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapFundAllocatSetupService]
    });
    injector = getTestBed();
    service = injector.get(CapFundAllocatSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapFundAllocatSetups', () => {
    it('should return an Promise<CapFundAllocatSetup[]>', () => {
      const capFundAllocatSetup = [
       {seqCfdstId:1234, jobId:'sample data', capFundModelId:'sample data', capFundMonth:'2018-01-01', allocationAmt:1234, status:'sample data', action:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', template:'sample data', capRunFromDate:'2018-01-01', jobRunDate:'2018-01-01', origNetAmt:1234, allocationPct:1234, allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCfdstId:1234, jobId:'sample data', capFundModelId:'sample data', capFundMonth:'2018-01-01', allocationAmt:1234, status:'sample data', action:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', template:'sample data', capRunFromDate:'2018-01-01', jobRunDate:'2018-01-01', origNetAmt:1234, allocationPct:1234, allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCfdstId:1234, jobId:'sample data', capFundModelId:'sample data', capFundMonth:'2018-01-01', allocationAmt:1234, status:'sample data', action:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', template:'sample data', capRunFromDate:'2018-01-01', jobRunDate:'2018-01-01', origNetAmt:1234, allocationPct:1234, allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapFundAllocatSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capfundallocatsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capFundAllocatSetup);
    });
  });


  describe('#createCapFundAllocatSetup', () => {
    var id = 1;
    it('should return an Promise<CapFundAllocatSetup>', () => {
      const capFundAllocatSetup: CapFundAllocatSetup = {seqCfdstId:1234, jobId:'sample data', capFundModelId:'sample data', capFundMonth:'2018-01-01', allocationAmt:1234, status:'sample data', action:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', template:'sample data', capRunFromDate:'2018-01-01', jobRunDate:'2018-01-01', origNetAmt:1234, allocationPct:1234, allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapFundAllocatSetup(capFundAllocatSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundallocatsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapFundAllocatSetup', () => {
    var id = 1;
    it('should return an Promise<CapFundAllocatSetup>', () => {
      const capFundAllocatSetup: CapFundAllocatSetup = {seqCfdstId:1234, jobId:'sample data', capFundModelId:'sample data', capFundMonth:'2018-01-01', allocationAmt:1234, status:'sample data', action:'sample data', requestUser:'sample data', requestDatetime:'2018-01-01', requestType:'sample data', template:'sample data', capRunFromDate:'2018-01-01', jobRunDate:'2018-01-01', origNetAmt:1234, allocationPct:1234, allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapFundAllocatSetup(capFundAllocatSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundallocatsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapFundAllocatSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapFundAllocatSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundallocatsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});