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

import { ProcFetchPartnerDetailsService } from './proc-fetch-partner-details.service';
import { ProcFetchPartnerDetails } from '../api-models/proc-fetch-partner-details.model'
import { ProcFetchPartnerDetail } from "../api-models/testing/fake-proc-fetch-partner-details.model"

describe('ProcFetchPartnerDetailsService', () => {
  let injector: TestBed;
  let service: ProcFetchPartnerDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcFetchPartnerDetailsService]
    });
    injector = getTestBed();
    service = injector.get(ProcFetchPartnerDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcFetchPartnerDetail', () => {
    it('should return an Promise<ProcFetchPartnerDetails[]>', () => {
      const procFetchPartnerDetails = [
       {pGroupId:'sample data', poPartnerInd:'sample data', poNewPlanInd:'sample data', poCompanyCode:'sample data', poEffectiveDate:'sample data', poRetcode:1234, poRetmsg:'sample data'},
       {pGroupId:'sample data', poPartnerInd:'sample data', poNewPlanInd:'sample data', poCompanyCode:'sample data', poEffectiveDate:'sample data', poRetcode:1234, poRetmsg:'sample data'},
       {pGroupId:'sample data', poPartnerInd:'sample data', poNewPlanInd:'sample data', poCompanyCode:'sample data', poEffectiveDate:'sample data', poRetcode:1234, poRetmsg:'sample data'}

      ];
      service.getProcFetchPartnerDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procfetchpartnerdetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procFetchPartnerDetails);
    });
  });


  describe('#createProcFetchPartnerDetails', () => {
    var id = 1;
    it('should return an Promise<ProcFetchPartnerDetails>', () => {
      const procFetchPartnerDetails: ProcFetchPartnerDetails = {pGroupId:'sample data', poPartnerInd:'sample data', poNewPlanInd:'sample data', poCompanyCode:'sample data', poEffectiveDate:'sample data', poRetcode:1234, poRetmsg:'sample data'};
      service.createProcFetchPartnerDetails(procFetchPartnerDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procfetchpartnerdetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcFetchPartnerDetails', () => {
    var id = 1;
    it('should return an Promise<ProcFetchPartnerDetails>', () => {
      const procFetchPartnerDetails: ProcFetchPartnerDetails = {pGroupId:'sample data', poPartnerInd:'sample data', poNewPlanInd:'sample data', poCompanyCode:'sample data', poEffectiveDate:'sample data', poRetcode:1234, poRetmsg:'sample data'};
      service.updateProcFetchPartnerDetails(procFetchPartnerDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procfetchpartnerdetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcFetchPartnerDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcFetchPartnerDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procfetchpartnerdetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});