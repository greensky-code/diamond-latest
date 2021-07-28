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

import { ClaimAuditSelectService } from './claim-audit-select.service';
import { ClaimAuditSelect } from '../api-models/claim-audit-select.model'
import { ClaimAuditSelects } from "../api-models/testing/fake-claim-audit-select.model"

describe('ClaimAuditSelectService', () => {
  let injector: TestBed;
  let service: ClaimAuditSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimAuditSelectService]
    });
    injector = getTestBed();
    service = injector.get(ClaimAuditSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimAuditSelects', () => {
    it('should return an Promise<ClaimAuditSelect[]>', () => {
      const claimAuditSelect = [
       {lineOfBusiness:'sample data', claimType:'sample data', claimAuditOrder:1234, searchSequence:1234, columnName:'sample data', determinantType:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234},
       {lineOfBusiness:'sample data', claimType:'sample data', claimAuditOrder:1234, searchSequence:1234, columnName:'sample data', determinantType:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234},
       {lineOfBusiness:'sample data', claimType:'sample data', claimAuditOrder:1234, searchSequence:1234, columnName:'sample data', determinantType:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234}

      ];
      service.getClaimAuditSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimAuditSelect);
    });
  });


  describe('#createClaimAuditSelect', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditSelect>', () => {
      const claimAuditSelect: ClaimAuditSelect = {lineOfBusiness:'sample data', claimType:'sample data', claimAuditOrder:1234, searchSequence:1234, columnName:'sample data', determinantType:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234};
      service.createClaimAuditSelect(claimAuditSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimAuditSelect', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditSelect>', () => {
      const claimAuditSelect: ClaimAuditSelect = {lineOfBusiness:'sample data', claimType:'sample data', claimAuditOrder:1234, searchSequence:1234, columnName:'sample data', determinantType:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234};
      service.updateClaimAuditSelect(claimAuditSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimAuditSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimAuditSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});