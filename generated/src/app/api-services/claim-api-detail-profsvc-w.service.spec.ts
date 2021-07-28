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

import { ClaimApiDetailProfsvcWService } from './claim-api-detail-profsvc-w.service';
import { ClaimApiDetailProfsvcW } from '../api-models/claim-api-detail-profsvc-w.model'
import { ClaimApiDetailProfsvcWs } from "../api-models/testing/fake-claim-api-detail-profsvc-w.model"

describe('ClaimApiDetailProfsvcWService', () => {
  let injector: TestBed;
  let service: ClaimApiDetailProfsvcWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimApiDetailProfsvcWService]
    });
    injector = getTestBed();
    service = injector.get(ClaimApiDetailProfsvcWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimApiDetailProfsvcWs', () => {
    it('should return an Promise<ClaimApiDetailProfsvcW[]>', () => {
      const claimApiDetailProfsvcW = [
       {claimIdNo:'sample data', lineNumber:'sample data', svcFromDate:'sample data', svcToDate:'sample data', renderingProviderId:'sample data', diagCodePointer1:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', placeOfSvc:'sample data', typeOfSvcCode:'sample data', hcpcsProcedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', lineCharges:'sample data', unitsOfSvc:'sample data', anesthesiaOxygenMin:'sample data', primaryPaidAmount:'sample data', status:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', epsdt:'sample data', familyPlanningIndicator:'sample data'},
       {claimIdNo:'sample data', lineNumber:'sample data', svcFromDate:'sample data', svcToDate:'sample data', renderingProviderId:'sample data', diagCodePointer1:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', placeOfSvc:'sample data', typeOfSvcCode:'sample data', hcpcsProcedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', lineCharges:'sample data', unitsOfSvc:'sample data', anesthesiaOxygenMin:'sample data', primaryPaidAmount:'sample data', status:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', epsdt:'sample data', familyPlanningIndicator:'sample data'},
       {claimIdNo:'sample data', lineNumber:'sample data', svcFromDate:'sample data', svcToDate:'sample data', renderingProviderId:'sample data', diagCodePointer1:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', placeOfSvc:'sample data', typeOfSvcCode:'sample data', hcpcsProcedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', lineCharges:'sample data', unitsOfSvc:'sample data', anesthesiaOxygenMin:'sample data', primaryPaidAmount:'sample data', status:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', epsdt:'sample data', familyPlanningIndicator:'sample data'}

      ];
      service.getClaimApiDetailProfsvcWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailprofsvcws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimApiDetailProfsvcW);
    });
  });


  describe('#createClaimApiDetailProfsvcW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiDetailProfsvcW>', () => {
      const claimApiDetailProfsvcW: ClaimApiDetailProfsvcW = {claimIdNo:'sample data', lineNumber:'sample data', svcFromDate:'sample data', svcToDate:'sample data', renderingProviderId:'sample data', diagCodePointer1:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', placeOfSvc:'sample data', typeOfSvcCode:'sample data', hcpcsProcedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', lineCharges:'sample data', unitsOfSvc:'sample data', anesthesiaOxygenMin:'sample data', primaryPaidAmount:'sample data', status:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', epsdt:'sample data', familyPlanningIndicator:'sample data'};
      service.createClaimApiDetailProfsvcW(claimApiDetailProfsvcW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailprofsvcws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimApiDetailProfsvcW', () => {
    var id = 1;
    it('should return an Promise<ClaimApiDetailProfsvcW>', () => {
      const claimApiDetailProfsvcW: ClaimApiDetailProfsvcW = {claimIdNo:'sample data', lineNumber:'sample data', svcFromDate:'sample data', svcToDate:'sample data', renderingProviderId:'sample data', diagCodePointer1:'sample data', diagCodePointer2:'sample data', diagCodePointer3:'sample data', diagCodePointer4:'sample data', placeOfSvc:'sample data', typeOfSvcCode:'sample data', hcpcsProcedureCode:'sample data', hcpcsModifier1:'sample data', hcpcsModifier2:'sample data', hcpcsModifier3:'sample data', hcpcsModifier4:'sample data', lineCharges:'sample data', unitsOfSvc:'sample data', anesthesiaOxygenMin:'sample data', primaryPaidAmount:'sample data', status:'sample data', epsdtFamilyPlanningInd:'sample data', emergencyServicesInd:'sample data', cobIndicator:'sample data', reservedLocalUseDet:'sample data', cobPatLiabCvrgAmt:'sample data', fullCvrgAmt:'sample data', ocAllowedAmt:'sample data', adjudDate:'sample data', epsdt:'sample data', familyPlanningIndicator:'sample data'};
      service.updateClaimApiDetailProfsvcW(claimApiDetailProfsvcW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailprofsvcws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimApiDetailProfsvcW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimApiDetailProfsvcW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimapidetailprofsvcws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});