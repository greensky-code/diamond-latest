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

import { ClaimAuditFilterService } from './claim-audit-filter.service';
import { ClaimAuditFilter } from '../api-models/claim-audit-filter.model'
import { ClaimAuditFilters } from "../api-models/testing/fake-claim-audit-filter.model"

describe('ClaimAuditFilterService', () => {
  let injector: TestBed;
  let service: ClaimAuditFilterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimAuditFilterService]
    });
    injector = getTestBed();
    service = injector.get(ClaimAuditFilterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimAuditFilters', () => {
    it('should return an Promise<ClaimAuditFilter[]>', () => {
      const claimAuditFilter = [
       {lineOfBusiness:'sample data', claimType:'sample data', claimResultCode:'sample data', daysHistory:1234, billedAmtMin:1234, billedAmtMax:1234, accountId:'sample data', includeCob:'sample data', includeSingleLine:'sample data', filterHistory:'sample data', optionalSort1Col:'sample data', optionalSort2Col:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234, swapModifiers:'sample data'},
       {lineOfBusiness:'sample data', claimType:'sample data', claimResultCode:'sample data', daysHistory:1234, billedAmtMin:1234, billedAmtMax:1234, accountId:'sample data', includeCob:'sample data', includeSingleLine:'sample data', filterHistory:'sample data', optionalSort1Col:'sample data', optionalSort2Col:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234, swapModifiers:'sample data'},
       {lineOfBusiness:'sample data', claimType:'sample data', claimResultCode:'sample data', daysHistory:1234, billedAmtMin:1234, billedAmtMax:1234, accountId:'sample data', includeCob:'sample data', includeSingleLine:'sample data', filterHistory:'sample data', optionalSort1Col:'sample data', optionalSort2Col:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234, swapModifiers:'sample data'}

      ];
      service.getClaimAuditFilters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditfilters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimAuditFilter);
    });
  });


  describe('#createClaimAuditFilter', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditFilter>', () => {
      const claimAuditFilter: ClaimAuditFilter = {lineOfBusiness:'sample data', claimType:'sample data', claimResultCode:'sample data', daysHistory:1234, billedAmtMin:1234, billedAmtMax:1234, accountId:'sample data', includeCob:'sample data', includeSingleLine:'sample data', filterHistory:'sample data', optionalSort1Col:'sample data', optionalSort2Col:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234, swapModifiers:'sample data'};
      service.createClaimAuditFilter(claimAuditFilter).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditfilters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimAuditFilter', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditFilter>', () => {
      const claimAuditFilter: ClaimAuditFilter = {lineOfBusiness:'sample data', claimType:'sample data', claimResultCode:'sample data', daysHistory:1234, billedAmtMin:1234, billedAmtMax:1234, accountId:'sample data', includeCob:'sample data', includeSingleLine:'sample data', filterHistory:'sample data', optionalSort1Col:'sample data', optionalSort2Col:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', claimAuditToolCode:1234, swapModifiers:'sample data'};
      service.updateClaimAuditFilter(claimAuditFilter, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditfilters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimAuditFilter', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimAuditFilter(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditfilters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});