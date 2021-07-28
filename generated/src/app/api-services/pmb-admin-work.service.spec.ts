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

import { PmbAdminWorkService } from './pmb-admin-work.service';
import { PmbAdminWork } from '../api-models/pmb-admin-work.model'
import { PmbAdminWorks } from "../api-models/testing/fake-pmb-admin-work.model"

describe('PmbAdminWorkService', () => {
  let injector: TestBed;
  let service: PmbAdminWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbAdminWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbAdminWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbAdminWorks', () => {
    it('should return an Promise<PmbAdminWork[]>', () => {
      const pmbAdminWork = [
       {seqGpbilId:1234, seqAdminId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', planCode:'sample data', premiumAmt:1234, seqParentId:1234},
       {seqGpbilId:1234, seqAdminId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', planCode:'sample data', premiumAmt:1234, seqParentId:1234},
       {seqGpbilId:1234, seqAdminId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', planCode:'sample data', premiumAmt:1234, seqParentId:1234}

      ];
      service.getPmbAdminWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbadminworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbAdminWork);
    });
  });


  describe('#createPmbAdminWork', () => {
    var id = 1;
    it('should return an Promise<PmbAdminWork>', () => {
      const pmbAdminWork: PmbAdminWork = {seqGpbilId:1234, seqAdminId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', planCode:'sample data', premiumAmt:1234, seqParentId:1234};
      service.createPmbAdminWork(pmbAdminWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbadminworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbAdminWork', () => {
    var id = 1;
    it('should return an Promise<PmbAdminWork>', () => {
      const pmbAdminWork: PmbAdminWork = {seqGpbilId:1234, seqAdminId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', planCode:'sample data', premiumAmt:1234, seqParentId:1234};
      service.updatePmbAdminWork(pmbAdminWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbadminworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbAdminWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbAdminWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbadminworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});