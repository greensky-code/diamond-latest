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

import { PmbGlWorkService } from './pmb-gl-work.service';
import { PmbGlWork } from '../api-models/pmb-gl-work.model'
import { PmbGlWorks } from "../api-models/testing/fake-pmb-gl-work.model"

describe('PmbGlWorkService', () => {
  let injector: TestBed;
  let service: PmbGlWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbGlWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbGlWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbGlWorks', () => {
    it('should return an Promise<PmbGlWork[]>', () => {
      const pmbGlWork = [
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234, seqParentId:1234},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234, seqParentId:1234},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234, seqParentId:1234}

      ];
      service.getPmbGlWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbglworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbGlWork);
    });
  });


  describe('#createPmbGlWork', () => {
    var id = 1;
    it('should return an Promise<PmbGlWork>', () => {
      const pmbGlWork: PmbGlWork = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234, seqParentId:1234};
      service.createPmbGlWork(pmbGlWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbglworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbGlWork', () => {
    var id = 1;
    it('should return an Promise<PmbGlWork>', () => {
      const pmbGlWork: PmbGlWork = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', companyCode:'sample data', glRefCode:'sample data', recordType:'sample data', planRiderCode:'sample data', premiumAmt:1234, seqParentId:1234};
      service.updatePmbGlWork(pmbGlWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbglworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbGlWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbGlWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbglworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});