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

import { DentalClaimDtlRemarksService } from './dental-claim-dtl-remarks.service';
import { DentalClaimDtlRemarks } from '../api-models/dental-claim-dtl-remarks.model'
import { DentalClaimDtlRemarkss } from "../api-models/testing/fake-dental-claim-dtl-remarks.model"

describe('DentalClaimDtlRemarksService', () => {
  let injector: TestBed;
  let service: DentalClaimDtlRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DentalClaimDtlRemarksService]
    });
    injector = getTestBed();
    service = injector.get(DentalClaimDtlRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDentalClaimDtlRemarkss', () => {
    it('should return an Promise<DentalClaimDtlRemarks[]>', () => {
      const dentalClaimDtlRemarks = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDentalClaimDtlRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdtlremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dentalClaimDtlRemarks);
    });
  });


  describe('#createDentalClaimDtlRemarks', () => {
    var id = 1;
    it('should return an Promise<DentalClaimDtlRemarks>', () => {
      const dentalClaimDtlRemarks: DentalClaimDtlRemarks = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDentalClaimDtlRemarks(dentalClaimDtlRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdtlremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDentalClaimDtlRemarks', () => {
    var id = 1;
    it('should return an Promise<DentalClaimDtlRemarks>', () => {
      const dentalClaimDtlRemarks: DentalClaimDtlRemarks = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDentalClaimDtlRemarks(dentalClaimDtlRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdtlremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDentalClaimDtlRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDentalClaimDtlRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalclaimdtlremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});