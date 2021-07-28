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

import { CapFundHdrService } from './cap-fund-hdr.service';
import { CapFundHdr } from '../api-models/cap-fund-hdr.model'
import { CapFundHdrs } from "../api-models/testing/fake-cap-fund-hdr.model"

describe('CapFundHdrService', () => {
  let injector: TestBed;
  let service: CapFundHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapFundHdrService]
    });
    injector = getTestBed();
    service = injector.get(CapFundHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapFundHdrs', () => {
    it('should return an Promise<CapFundHdr[]>', () => {
      const capFundHdr = [
       {capFundModelId:'sample data', claimType:'sample data', allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capFundModelId:'sample data', claimType:'sample data', allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {capFundModelId:'sample data', claimType:'sample data', allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCapFundHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capFundHdr);
    });
  });


  describe('#createCapFundHdr', () => {
    var id = 1;
    it('should return an Promise<CapFundHdr>', () => {
      const capFundHdr: CapFundHdr = {capFundModelId:'sample data', claimType:'sample data', allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCapFundHdr(capFundHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapFundHdr', () => {
    var id = 1;
    it('should return an Promise<CapFundHdr>', () => {
      const capFundHdr: CapFundHdr = {capFundModelId:'sample data', claimType:'sample data', allocationMethod:1234, minAllocationPct:1234, maxAllocationPct:1234, capFundModelDesc:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCapFundHdr(capFundHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapFundHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapFundHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});