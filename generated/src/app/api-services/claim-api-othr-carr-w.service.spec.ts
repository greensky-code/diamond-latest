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

import { ClaimApiOthrCarrWService } from './claim-api-othr-carr-w.service';
import { ClaimApiOthrCarrW } from '../api-models/claim-api-othr-carr-w.model'
import { ClaimApiOthrCarrWs } from "../api-models/testing/fake-claim-api-othr-carr-w.model"

describe('ClaimApiOthrCarrWService', () => {
  let injector: TestBed;
  let service: ClaimApiOthrCarrWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimApiOthrCarrWService]
    });
    injector = getTestBed();
    service = injector.get(ClaimApiOthrCarrWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimApiOthrCarrWs', () => {
    it('should return an Promise<ClaimApiOthrCarrW[]>', () => {
      const claimApiOthrCarrW = [
       {claimNumber:'sample data', sequenceNo:'sample data', payorId:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmtDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', patRelToInsured:'sample data', idNumber:'sample data', groupName:'sample data', groupNumber:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data'},
       {claimNumber:'sample data', sequenceNo:'sample data', payorId:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmtDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', patRelToInsured:'sample data', idNumber:'sample data', groupName:'sample data', groupNumber:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data'},
       {claimNumber:'sample data', sequenceNo:'sample data', payorId:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmtDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', patRelToInsured:'sample data', idNumber:'sample data', groupName:'sample data', groupNumber:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data'}

      ];
      service.getClaimApiOthrCarrWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiothrcarrws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimApiOthrCarrW);
    });
  });


  describe('#createClaimApiOthrCarrW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiOthrCarrW>', () => {
      const claimApiOthrCarrW: ClaimApiOthrCarrW = {claimNumber:'sample data', sequenceNo:'sample data', payorId:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmtDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', patRelToInsured:'sample data', idNumber:'sample data', groupName:'sample data', groupNumber:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data'};
      service.createClaimApiOthrCarrW(claimApiOthrCarrW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiothrcarrws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimApiOthrCarrW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiOthrCarrW>', () => {
      const claimApiOthrCarrW: ClaimApiOthrCarrW = {claimNumber:'sample data', sequenceNo:'sample data', payorId:'sample data', providerNumber:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmtDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', patRelToInsured:'sample data', idNumber:'sample data', groupName:'sample data', groupNumber:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data'};
      service.updateClaimApiOthrCarrW(claimApiOthrCarrW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiothrcarrws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimApiOthrCarrW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimApiOthrCarrW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiothrcarrws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});