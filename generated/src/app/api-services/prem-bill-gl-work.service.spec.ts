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

import { PremBillGlWorkService } from './prem-bill-gl-work.service';
import { PremBillGlWork } from '../api-models/prem-bill-gl-work.model'
import { PremBillGlWorks } from "../api-models/testing/fake-prem-bill-gl-work.model"

describe('PremBillGlWorkService', () => {
  let injector: TestBed;
  let service: PremBillGlWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremBillGlWorkService]
    });
    injector = getTestBed();
    service = injector.get(PremBillGlWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremBillGlWorks', () => {
    it('should return an Promise<PremBillGlWork[]>', () => {
      const premBillGlWork = [
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234}

      ];
      service.getPremBillGlWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/prembillglworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premBillGlWork);
    });
  });


  describe('#createPremBillGlWork', () => {
    var id = 1;
    it('should return an Promise<PremBillGlWork>', () => {
      const premBillGlWork: PremBillGlWork = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234};
      service.createPremBillGlWork(premBillGlWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillglworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremBillGlWork', () => {
    var id = 1;
    it('should return an Promise<PremBillGlWork>', () => {
      const premBillGlWork: PremBillGlWork = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234};
      service.updatePremBillGlWork(premBillGlWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillglworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremBillGlWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremBillGlWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillglworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});