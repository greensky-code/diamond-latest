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

import { ClaimApiInsurnProfsvcWService } from './claim-api-insurn-profsvc-w.service';
import { ClaimApiInsurnProfsvcW } from '../api-models/claim-api-insurn-profsvc-w.model'
import { ClaimApiInsurnProfsvcWs } from "../api-models/testing/fake-claim-api-insurn-profsvc-w.model"

describe('ClaimApiInsurnProfsvcWService', () => {
  let injector: TestBed;
  let service: ClaimApiInsurnProfsvcWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimApiInsurnProfsvcWService]
    });
    injector = getTestBed();
    service = injector.get(ClaimApiInsurnProfsvcWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimApiInsurnProfsvcWs', () => {
    it('should return an Promise<ClaimApiInsurnProfsvcW[]>', () => {
      const claimApiInsurnProfsvcW = [
       {claimIdNo:'sample data', sequenceNo:'sample data', claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'sample data', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:'sample data', disallowedOther:'sample data', allowedAmount:'sample data', deductibleAmount:'sample data', coinsuranceAmount:'sample data', payorAmountPaid:'sample data', zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'sample data', insCardTermDate:'sample data', balanceDue:'sample data', status:'sample data', payorCountry:'sample data'},
       {claimIdNo:'sample data', sequenceNo:'sample data', claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'sample data', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:'sample data', disallowedOther:'sample data', allowedAmount:'sample data', deductibleAmount:'sample data', coinsuranceAmount:'sample data', payorAmountPaid:'sample data', zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'sample data', insCardTermDate:'sample data', balanceDue:'sample data', status:'sample data', payorCountry:'sample data'},
       {claimIdNo:'sample data', sequenceNo:'sample data', claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'sample data', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:'sample data', disallowedOther:'sample data', allowedAmount:'sample data', deductibleAmount:'sample data', coinsuranceAmount:'sample data', payorAmountPaid:'sample data', zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'sample data', insCardTermDate:'sample data', balanceDue:'sample data', status:'sample data', payorCountry:'sample data'}

      ];
      service.getClaimApiInsurnProfsvcWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiinsurnprofsvcws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimApiInsurnProfsvcW);
    });
  });


  describe('#createClaimApiInsurnProfsvcW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiInsurnProfsvcW>', () => {
      const claimApiInsurnProfsvcW: ClaimApiInsurnProfsvcW = {claimIdNo:'sample data', sequenceNo:'sample data', claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'sample data', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:'sample data', disallowedOther:'sample data', allowedAmount:'sample data', deductibleAmount:'sample data', coinsuranceAmount:'sample data', payorAmountPaid:'sample data', zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'sample data', insCardTermDate:'sample data', balanceDue:'sample data', status:'sample data', payorCountry:'sample data'};
      service.createClaimApiInsurnProfsvcW(claimApiInsurnProfsvcW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiinsurnprofsvcws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimApiInsurnProfsvcW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiInsurnProfsvcW>', () => {
      const claimApiInsurnProfsvcW: ClaimApiInsurnProfsvcW = {claimIdNo:'sample data', sequenceNo:'sample data', claimFilingInd:'sample data', sourceOfPay:'sample data', insuranceTypeCode:'sample data', payorOrganizationId:'sample data', payorClaimOfficeNo:'sample data', payorName:'sample data', groupNo:'sample data', groupName:'sample data', ppoHmoInd:'sample data', ppoInd:'sample data', priorAuthNo:'sample data', assignOfBenefits:'sample data', patSignatureSource:'sample data', patRelToInsured:'sample data', insuredIdNo:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMi:'sample data', insuredGeneration:'sample data', insuredSex:'sample data', insuredDateOfBirth:'sample data', insuredEmplStatus:'sample data', supplementalInsInd:'sample data', insuranceLocationId:'sample data', payorAddr1:'sample data', payorAddr2:'sample data', payorCity:'sample data', payorState:'sample data', payorZip:'sample data', disallowedCostCont:'sample data', disallowedOther:'sample data', allowedAmount:'sample data', deductibleAmount:'sample data', coinsuranceAmount:'sample data', payorAmountPaid:'sample data', zeroPaidInd:'sample data', adjudicationInd1:'sample data', adjudicationInd2:'sample data', adjudicationInd3:'sample data', champusSpnsrBranch:'sample data', champusSpnsrGrade:'sample data', champusSpnsrStatus:'sample data', insCardEffectDate:'sample data', insCardTermDate:'sample data', balanceDue:'sample data', status:'sample data', payorCountry:'sample data'};
      service.updateClaimApiInsurnProfsvcW(claimApiInsurnProfsvcW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiinsurnprofsvcws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimApiInsurnProfsvcW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimApiInsurnProfsvcW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapiinsurnprofsvcws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});