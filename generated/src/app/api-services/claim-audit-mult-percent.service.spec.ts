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

import { ClaimAuditMultPercentService } from './claim-audit-mult-percent.service';
import { ClaimAuditMultPercent } from '../api-models/claim-audit-mult-percent.model'
import { ClaimAuditMultPercents } from "../api-models/testing/fake-claim-audit-mult-percent.model"

describe('ClaimAuditMultPercentService', () => {
  let injector: TestBed;
  let service: ClaimAuditMultPercentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimAuditMultPercentService]
    });
    injector = getTestBed();
    service = injector.get(ClaimAuditMultPercentService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimAuditMultPercents', () => {
    it('should return an Promise<ClaimAuditMultPercent[]>', () => {
      const claimAuditMultPercent = [
       {claimResultCode:'sample data', payPercentage:1234, procedureModifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {claimResultCode:'sample data', payPercentage:1234, procedureModifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {claimResultCode:'sample data', payPercentage:1234, procedureModifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClaimAuditMultPercents().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditmultpercents/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimAuditMultPercent);
    });
  });


  describe('#createClaimAuditMultPercent', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditMultPercent>', () => {
      const claimAuditMultPercent: ClaimAuditMultPercent = {claimResultCode:'sample data', payPercentage:1234, procedureModifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClaimAuditMultPercent(claimAuditMultPercent).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditmultpercents`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimAuditMultPercent', () => {
    var id = 1;
    it('should return an Promise<ClaimAuditMultPercent>', () => {
      const claimAuditMultPercent: ClaimAuditMultPercent = {claimResultCode:'sample data', payPercentage:1234, procedureModifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClaimAuditMultPercent(claimAuditMultPercent, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditmultpercents/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimAuditMultPercent', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimAuditMultPercent(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimauditmultpercents/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});