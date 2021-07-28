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

import { DentalClaimHdrRemarksService } from './dental-claim-hdr-remarks.service';
import { DentalClaimHdrRemarks } from '../api-models/dental-claim-hdr-remarks.model'
import { DentalClaimHdrRemarkss } from "../api-models/testing/fake-dental-claim-hdr-remarks.model"

describe('DentalClaimHdrRemarksService', () => {
  let injector: TestBed;
  let service: DentalClaimHdrRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DentalClaimHdrRemarksService]
    });
    injector = getTestBed();
    service = injector.get(DentalClaimHdrRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDentalClaimHdrRemarkss', () => {
    it('should return an Promise<DentalClaimHdrRemarks[]>', () => {
      const dentalClaimHdrRemarks = [
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDentalClaimHdrRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimhdrremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dentalClaimHdrRemarks);
    });
  });


  describe('#createDentalClaimHdrRemarks', () => {
    var id = 1;
    it('should return an Promise<DentalClaimHdrRemarks>', () => {
      const dentalClaimHdrRemarks: DentalClaimHdrRemarks = {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDentalClaimHdrRemarks(dentalClaimHdrRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimhdrremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDentalClaimHdrRemarks', () => {
    var id = 1;
    it('should return an Promise<DentalClaimHdrRemarks>', () => {
      const dentalClaimHdrRemarks: DentalClaimHdrRemarks = {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDentalClaimHdrRemarks(dentalClaimHdrRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimhdrremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDentalClaimHdrRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDentalClaimHdrRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimhdrremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});