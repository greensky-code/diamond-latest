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

import { ClaimApiDetailInstWService } from './claim-api-detail-inst-w.service';
import { ClaimApiDetailInstW } from '../api-models/claim-api-detail-inst-w.model'
import { ClaimApiDetailInstWs } from "../api-models/testing/fake-claim-api-detail-inst-w.model"

describe('ClaimApiDetailInstWService', () => {
  let injector: TestBed;
  let service: ClaimApiDetailInstWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimApiDetailInstWService]
    });
    injector = getTestBed();
    service = injector.get(ClaimApiDetailInstWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimApiDetailInstWs', () => {
    it('should return an Promise<ClaimApiDetailInstW[]>', () => {
      const claimApiDetailInstW = [
       {claimNumber:'sample data', lineNumber:'sample data', detailSvcDate:'sample data', detailThruDate:'sample data', diagnosisPointer:'sample data', placeServPointer:'sample data', procedureCode:'sample data', quantity:'sample data', billedAmount:'sample data', status:'sample data', alternateProcCode:'sample data', accommodationRate:'sample data', nationalUnlabeled1:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', procedureModifier:'sample data'},
       {claimNumber:'sample data', lineNumber:'sample data', detailSvcDate:'sample data', detailThruDate:'sample data', diagnosisPointer:'sample data', placeServPointer:'sample data', procedureCode:'sample data', quantity:'sample data', billedAmount:'sample data', status:'sample data', alternateProcCode:'sample data', accommodationRate:'sample data', nationalUnlabeled1:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', procedureModifier:'sample data'},
       {claimNumber:'sample data', lineNumber:'sample data', detailSvcDate:'sample data', detailThruDate:'sample data', diagnosisPointer:'sample data', placeServPointer:'sample data', procedureCode:'sample data', quantity:'sample data', billedAmount:'sample data', status:'sample data', alternateProcCode:'sample data', accommodationRate:'sample data', nationalUnlabeled1:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', procedureModifier:'sample data'}

      ];
      service.getClaimApiDetailInstWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailinstws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimApiDetailInstW);
    });
  });


  describe('#createClaimApiDetailInstW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiDetailInstW>', () => {
      const claimApiDetailInstW: ClaimApiDetailInstW = {claimNumber:'sample data', lineNumber:'sample data', detailSvcDate:'sample data', detailThruDate:'sample data', diagnosisPointer:'sample data', placeServPointer:'sample data', procedureCode:'sample data', quantity:'sample data', billedAmount:'sample data', status:'sample data', alternateProcCode:'sample data', accommodationRate:'sample data', nationalUnlabeled1:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', procedureModifier:'sample data'};
      service.createClaimApiDetailInstW(claimApiDetailInstW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailinstws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimApiDetailInstW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiDetailInstW>', () => {
      const claimApiDetailInstW: ClaimApiDetailInstW = {claimNumber:'sample data', lineNumber:'sample data', detailSvcDate:'sample data', detailThruDate:'sample data', diagnosisPointer:'sample data', placeServPointer:'sample data', procedureCode:'sample data', quantity:'sample data', billedAmount:'sample data', status:'sample data', alternateProcCode:'sample data', accommodationRate:'sample data', nationalUnlabeled1:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', procedureModifier:'sample data'};
      service.updateClaimApiDetailInstW(claimApiDetailInstW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailinstws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimApiDetailInstW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimApiDetailInstW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailinstws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});