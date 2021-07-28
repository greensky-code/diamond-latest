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

import { ProcUpdPharmacyPartnerIndService } from './proc-upd-pharmacy-partner-ind.service';
import { ProcUpdPharmacyPartnerInd } from '../api-models/proc-upd-pharmacy-partner-ind.model'
import { ProcUpdPharmacyPartnerInds } from "../api-models/testing/fake-proc-upd-pharmacy-partner-ind.model"

describe('ProcUpdPharmacyPartnerIndService', () => {
  let injector: TestBed;
  let service: ProcUpdPharmacyPartnerIndService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcUpdPharmacyPartnerIndService]
    });
    injector = getTestBed();
    service = injector.get(ProcUpdPharmacyPartnerIndService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcUpdPharmacyPartnerInds', () => {
    it('should return an Promise<ProcUpdPharmacyPartnerInd[]>', () => {
      const procUpdPharmacyPartnerInd = [
       {pGroupId:'sample data', pPartnerInd:'sample data', poRetcode:1234, poRetmsg:'sample data'},
       {pGroupId:'sample data', pPartnerInd:'sample data', poRetcode:1234, poRetmsg:'sample data'},
       {pGroupId:'sample data', pPartnerInd:'sample data', poRetcode:1234, poRetmsg:'sample data'}

      ];
      service.getProcUpdPharmacyPartnerInds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procupdpharmacypartnerinds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procUpdPharmacyPartnerInd);
    });
  });


  describe('#createProcUpdPharmacyPartnerInd', () => {
    var id = 1;
    it('should return an Promise<ProcUpdPharmacyPartnerInd>', () => {
      const procUpdPharmacyPartnerInd: ProcUpdPharmacyPartnerInd = {pGroupId:'sample data', pPartnerInd:'sample data', poRetcode:1234, poRetmsg:'sample data'};
      service.createProcUpdPharmacyPartnerInd(procUpdPharmacyPartnerInd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdpharmacypartnerinds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcUpdPharmacyPartnerInd', () => {
    var id = 1;
    it('should return an Promise<ProcUpdPharmacyPartnerInd>', () => {
      const procUpdPharmacyPartnerInd: ProcUpdPharmacyPartnerInd = {pGroupId:'sample data', pPartnerInd:'sample data', poRetcode:1234, poRetmsg:'sample data'};
      service.updateProcUpdPharmacyPartnerInd(procUpdPharmacyPartnerInd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdpharmacypartnerinds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcUpdPharmacyPartnerInd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcUpdPharmacyPartnerInd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procupdpharmacypartnerinds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});