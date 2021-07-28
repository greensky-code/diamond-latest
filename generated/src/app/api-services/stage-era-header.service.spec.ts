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

import { StageEraHeaderService } from './stage-era-header.service';
import { StageEraHeader } from '../api-models/stage-era-header.model'
import { StageEraHeaders } from "../api-models/testing/fake-stage-era-header.model"

describe('StageEraHeaderService', () => {
  let injector: TestBed;
  let service: StageEraHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageEraHeaderService]
    });
    injector = getTestBed();
    service = injector.get(StageEraHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageEraHeaders', () => {
    it('should return an Promise<StageEraHeader[]>', () => {
      const stageEraHeader = [
       {batchId:'sample data', transactionId:1234, seqClaimId:1234, patControlNo:'sample data', claimFilingIndicator:'sample data', claimNumber:'sample data', placeOfService1:'sample data', billType:'sample data', drgCode:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleInitial:'sample data', patientId:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleInitial:'sample data', subscriberId:'sample data', providerCategory:'sample data', providerLastName:'sample data', providerFirstName:'sample data', providerMiddleInitial:'sample data', providerTaxId:'sample data', authNumber:1234, termDate:'2018-01-01', dateReceived:'2018-01-01', primaryServiceDate:'2018-01-01', claimThruDate:'2018-01-01', claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', totalBilled:1234, totalNet:1234, totalPatientLiability:1234},
       {batchId:'sample data', transactionId:1234, seqClaimId:1234, patControlNo:'sample data', claimFilingIndicator:'sample data', claimNumber:'sample data', placeOfService1:'sample data', billType:'sample data', drgCode:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleInitial:'sample data', patientId:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleInitial:'sample data', subscriberId:'sample data', providerCategory:'sample data', providerLastName:'sample data', providerFirstName:'sample data', providerMiddleInitial:'sample data', providerTaxId:'sample data', authNumber:1234, termDate:'2018-01-01', dateReceived:'2018-01-01', primaryServiceDate:'2018-01-01', claimThruDate:'2018-01-01', claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', totalBilled:1234, totalNet:1234, totalPatientLiability:1234},
       {batchId:'sample data', transactionId:1234, seqClaimId:1234, patControlNo:'sample data', claimFilingIndicator:'sample data', claimNumber:'sample data', placeOfService1:'sample data', billType:'sample data', drgCode:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleInitial:'sample data', patientId:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleInitial:'sample data', subscriberId:'sample data', providerCategory:'sample data', providerLastName:'sample data', providerFirstName:'sample data', providerMiddleInitial:'sample data', providerTaxId:'sample data', authNumber:1234, termDate:'2018-01-01', dateReceived:'2018-01-01', primaryServiceDate:'2018-01-01', claimThruDate:'2018-01-01', claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', totalBilled:1234, totalNet:1234, totalPatientLiability:1234}

      ];
      service.getStageEraHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageEraHeader);
    });
  });


  describe('#createStageEraHeader', () => {
    var id = 1;
    it('should return an Promise<StageEraHeader>', () => {
      const stageEraHeader: StageEraHeader = {batchId:'sample data', transactionId:1234, seqClaimId:1234, patControlNo:'sample data', claimFilingIndicator:'sample data', claimNumber:'sample data', placeOfService1:'sample data', billType:'sample data', drgCode:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleInitial:'sample data', patientId:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleInitial:'sample data', subscriberId:'sample data', providerCategory:'sample data', providerLastName:'sample data', providerFirstName:'sample data', providerMiddleInitial:'sample data', providerTaxId:'sample data', authNumber:1234, termDate:'2018-01-01', dateReceived:'2018-01-01', primaryServiceDate:'2018-01-01', claimThruDate:'2018-01-01', claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', totalBilled:1234, totalNet:1234, totalPatientLiability:1234};
      service.createStageEraHeader(stageEraHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageEraHeader', () => {
    var id = 1;
    it('should return an Promise<StageEraHeader>', () => {
      const stageEraHeader: StageEraHeader = {batchId:'sample data', transactionId:1234, seqClaimId:1234, patControlNo:'sample data', claimFilingIndicator:'sample data', claimNumber:'sample data', placeOfService1:'sample data', billType:'sample data', drgCode:'sample data', patientLastName:'sample data', patientFirstName:'sample data', patientMiddleInitial:'sample data', patientId:'sample data', subscriberLastName:'sample data', subscriberFirstName:'sample data', subscriberMiddleInitial:'sample data', subscriberId:'sample data', providerCategory:'sample data', providerLastName:'sample data', providerFirstName:'sample data', providerMiddleInitial:'sample data', providerTaxId:'sample data', authNumber:1234, termDate:'2018-01-01', dateReceived:'2018-01-01', primaryServiceDate:'2018-01-01', claimThruDate:'2018-01-01', claimStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', totalBilled:1234, totalNet:1234, totalPatientLiability:1234};
      service.updateStageEraHeader(stageEraHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageEraHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageEraHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageeraheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});