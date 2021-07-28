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

import { ClaimDetailNdcService } from './claim-detail-ndc.service';
import { ClaimDetailNdc } from '../api-models/claim-detail-ndc.model'
import { ClaimDetailNdcs } from "../api-models/testing/fake-claim-detail-ndc.model"

describe('ClaimDetailNdcService', () => {
  let injector: TestBed;
  let service: ClaimDetailNdcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimDetailNdcService]
    });
    injector = getTestBed();
    service = injector.get(ClaimDetailNdcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimDetailNdcs', () => {
    it('should return an Promise<ClaimDetailNdc[]>', () => {
      const claimDetailNdc = [
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', ndcLineNumber:1234, ndcCode:'sample data', quantity:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxNumber:'sample data'},
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', ndcLineNumber:1234, ndcCode:'sample data', quantity:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxNumber:'sample data'},
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', ndcLineNumber:1234, ndcCode:'sample data', quantity:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxNumber:'sample data'}

      ];
      service.getClaimDetailNdcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimdetailndcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimDetailNdc);
    });
  });


  describe('#createClaimDetailNdc', () => {
    var id = 1;
    it('should return an Promise<ClaimDetailNdc>', () => {
      const claimDetailNdc: ClaimDetailNdc = {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', ndcLineNumber:1234, ndcCode:'sample data', quantity:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxNumber:'sample data'};
      service.createClaimDetailNdc(claimDetailNdc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimdetailndcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimDetailNdc', () => {
    var id = 1;
    it('should return an Promise<ClaimDetailNdc>', () => {
      const claimDetailNdc: ClaimDetailNdc = {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', ndcLineNumber:1234, ndcCode:'sample data', quantity:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ndcAmount:1234, ndcUnitMeasure:'sample data', ndcRxNumber:'sample data'};
      service.updateClaimDetailNdc(claimDetailNdc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimdetailndcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimDetailNdc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimDetailNdc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimdetailndcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});