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

import { AuthProcedureService } from './auth-procedure.service';
import { AuthProcedure } from '../api-models/auth-procedure.model'
import { AuthProcedures } from "../api-models/testing/fake-auth-procedure.model"

describe('AuthProcedureService', () => {
  let injector: TestBed;
  let service: AuthProcedureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthProcedureService]
    });
    injector = getTestBed();
    service = injector.get(AuthProcedureService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthProcedures', () => {
    it('should return an Promise<AuthProcedure[]>', () => {
      const authProcedure = [
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthDetail:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', authProcedures:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', actualQty:1234, actualAmt:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', costProcedureCd:'sample data', priceSchedule:'sample data', priceRegion:'sample data', authorizedCost:1234, fromDate1:'2018-01-01', thruDate1:'2018-01-01', authProcedure1:'sample data', authorizedQty1:1234, actualQty1:1234, actualAmt1:1234, allowedAmt1:1234, costProcedureCd1:'sample data', priceSchedule1:'sample data', priceRegion1:'sample data', authorizedCost1:1234, fromDate2:'2018-01-01', thruDate2:'2018-01-01', authProcedure2:'sample data', authorizedQty2:1234, actualQty2:1234, actualAmt2:1234, allowedAmt2:1234, costProcedureCd2:'sample data', priceSchedule2:'sample data', priceRegion2:'sample data', authorizedCost2:1234, fromDate3:'2018-01-01', thruDate3:'2018-01-01', authProcedure3:'sample data', authorizedQty3:1234, actualQty3:1234, actualAmt3:1234, allowedAmt3:1234, costProcedureCd3:'sample data', priceSchedule3:'sample data', priceRegion3:'sample data', authorizedCost3:1234, requestedAmount:1234, requestedQty:1234, purchasePrice:1234, ndcCode:'sample data', toothNumber:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', paperworkAttached:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', processStatus:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthDetail:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', authProcedures:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', actualQty:1234, actualAmt:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', costProcedureCd:'sample data', priceSchedule:'sample data', priceRegion:'sample data', authorizedCost:1234, fromDate1:'2018-01-01', thruDate1:'2018-01-01', authProcedure1:'sample data', authorizedQty1:1234, actualQty1:1234, actualAmt1:1234, allowedAmt1:1234, costProcedureCd1:'sample data', priceSchedule1:'sample data', priceRegion1:'sample data', authorizedCost1:1234, fromDate2:'2018-01-01', thruDate2:'2018-01-01', authProcedure2:'sample data', authorizedQty2:1234, actualQty2:1234, actualAmt2:1234, allowedAmt2:1234, costProcedureCd2:'sample data', priceSchedule2:'sample data', priceRegion2:'sample data', authorizedCost2:1234, fromDate3:'2018-01-01', thruDate3:'2018-01-01', authProcedure3:'sample data', authorizedQty3:1234, actualQty3:1234, actualAmt3:1234, allowedAmt3:1234, costProcedureCd3:'sample data', priceSchedule3:'sample data', priceRegion3:'sample data', authorizedCost3:1234, requestedAmount:1234, requestedQty:1234, purchasePrice:1234, ndcCode:'sample data', toothNumber:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', paperworkAttached:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', processStatus:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthDetail:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', authProcedures:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', actualQty:1234, actualAmt:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', costProcedureCd:'sample data', priceSchedule:'sample data', priceRegion:'sample data', authorizedCost:1234, fromDate1:'2018-01-01', thruDate1:'2018-01-01', authProcedure1:'sample data', authorizedQty1:1234, actualQty1:1234, actualAmt1:1234, allowedAmt1:1234, costProcedureCd1:'sample data', priceSchedule1:'sample data', priceRegion1:'sample data', authorizedCost1:1234, fromDate2:'2018-01-01', thruDate2:'2018-01-01', authProcedure2:'sample data', authorizedQty2:1234, actualQty2:1234, actualAmt2:1234, allowedAmt2:1234, costProcedureCd2:'sample data', priceSchedule2:'sample data', priceRegion2:'sample data', authorizedCost2:1234, fromDate3:'2018-01-01', thruDate3:'2018-01-01', authProcedure3:'sample data', authorizedQty3:1234, actualQty3:1234, actualAmt3:1234, allowedAmt3:1234, costProcedureCd3:'sample data', priceSchedule3:'sample data', priceRegion3:'sample data', authorizedCost3:1234, requestedAmount:1234, requestedQty:1234, purchasePrice:1234, ndcCode:'sample data', toothNumber:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', paperworkAttached:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', processStatus:'sample data'}

      ];
      service.getAuthProcedures().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedures/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authProcedure);
    });
  });


  describe('#createAuthProcedure', () => {
    var id = 1;
    it('should return an Promise<AuthProcedure>', () => {
      const authProcedure: AuthProcedure = {authNumber:1234, secondaryAuthNo:'sample data', seqAuthDetail:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', authProcedures:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', actualQty:1234, actualAmt:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', costProcedureCd:'sample data', priceSchedule:'sample data', priceRegion:'sample data', authorizedCost:1234, fromDate1:'2018-01-01', thruDate1:'2018-01-01', authProcedure1:'sample data', authorizedQty1:1234, actualQty1:1234, actualAmt1:1234, allowedAmt1:1234, costProcedureCd1:'sample data', priceSchedule1:'sample data', priceRegion1:'sample data', authorizedCost1:1234, fromDate2:'2018-01-01', thruDate2:'2018-01-01', authProcedure2:'sample data', authorizedQty2:1234, actualQty2:1234, actualAmt2:1234, allowedAmt2:1234, costProcedureCd2:'sample data', priceSchedule2:'sample data', priceRegion2:'sample data', authorizedCost2:1234, fromDate3:'2018-01-01', thruDate3:'2018-01-01', authProcedure3:'sample data', authorizedQty3:1234, actualQty3:1234, actualAmt3:1234, allowedAmt3:1234, costProcedureCd3:'sample data', priceSchedule3:'sample data', priceRegion3:'sample data', authorizedCost3:1234, requestedAmount:1234, requestedQty:1234, purchasePrice:1234, ndcCode:'sample data', toothNumber:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', paperworkAttached:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', processStatus:'sample data'};
      service.createAuthProcedure(authProcedure).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedures`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuthProcedure', () => {
    var id = 1;
    it('should return an Promise<AuthProcedure>', () => {
      const authProcedure: AuthProcedure = {authNumber:1234, secondaryAuthNo:'sample data', seqAuthDetail:1234, fromDate:'2018-01-01', thruDate:'2018-01-01', authProcedures:'sample data', authorizedQty:1234, allowedAmt:1234, status:'sample data', statusDate:'2018-01-01', statusReason:'sample data', denialNotification:'sample data', notificationDate:'2018-01-01', actualQty:1234, actualAmt:1234, medDefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', costProcedureCd:'sample data', priceSchedule:'sample data', priceRegion:'sample data', authorizedCost:1234, fromDate1:'2018-01-01', thruDate1:'2018-01-01', authProcedure1:'sample data', authorizedQty1:1234, actualQty1:1234, actualAmt1:1234, allowedAmt1:1234, costProcedureCd1:'sample data', priceSchedule1:'sample data', priceRegion1:'sample data', authorizedCost1:1234, fromDate2:'2018-01-01', thruDate2:'2018-01-01', authProcedure2:'sample data', authorizedQty2:1234, actualQty2:1234, actualAmt2:1234, allowedAmt2:1234, costProcedureCd2:'sample data', priceSchedule2:'sample data', priceRegion2:'sample data', authorizedCost2:1234, fromDate3:'2018-01-01', thruDate3:'2018-01-01', authProcedure3:'sample data', authorizedQty3:1234, actualQty3:1234, actualAmt3:1234, allowedAmt3:1234, costProcedureCd3:'sample data', priceSchedule3:'sample data', priceRegion3:'sample data', authorizedCost3:1234, requestedAmount:1234, requestedQty:1234, purchasePrice:1234, ndcCode:'sample data', toothNumber:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', paperworkAttached:'sample data', providerTrackingNo:'sample data', providerEntityId:'sample data', clrnghseTrackingNo:'sample data', clrnghseEntityId:'sample data', responseTrackingNo:'sample data', responseEntityId:'sample data', processStatus:'sample data'};
      service.updateAuthProcedure(authProcedure, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedures/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuthProcedure', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthProcedure(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authprocedures/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});