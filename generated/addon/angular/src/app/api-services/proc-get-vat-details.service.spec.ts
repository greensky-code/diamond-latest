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

import { ProcGetVatDetailsService } from './proc-get-vat-details.service';
import { ProcGetVatDetails } from '../api-models/proc-get-vat-details.model'
import { ProcGetVatDetail } from "../api-models/testing/fake-proc-get-vat-details.model"

describe('ProcGetVatDetailsService', () => {
  let injector: TestBed;
  let service: ProcGetVatDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetVatDetailsService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetVatDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetVatDetail', () => {
    it('should return an Promise<ProcGetVatDetails[]>', () => {
      const procGetVatDetails = [
       {pGroupId:'sample data', pCountryCode:'sample data'},
       {pGroupId:'sample data', pCountryCode:'sample data'},
       {pGroupId:'sample data', pCountryCode:'sample data'}

      ];
      service.getProcGetVatDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetvatdetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetVatDetails);
    });
  });


  describe('#createProcGetVatDetails', () => {
    var id = 1;
    it('should return an Promise<ProcGetVatDetails>', () => {
      const procGetVatDetails: ProcGetVatDetails = {pGroupId:'sample data', pCountryCode:'sample data'};
      service.createProcGetVatDetails(procGetVatDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetvatdetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetVatDetails', () => {
    var id = 1;
    it('should return an Promise<ProcGetVatDetails>', () => {
      const procGetVatDetails: ProcGetVatDetails = {pGroupId:'sample data', pCountryCode:'sample data'};
      service.updateProcGetVatDetails(procGetVatDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetvatdetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetVatDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetVatDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetvatdetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});