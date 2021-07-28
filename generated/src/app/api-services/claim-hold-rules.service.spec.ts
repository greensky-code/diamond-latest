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

import { ClaimHoldRulesService } from './claim-hold-rules.service';
import { ClaimHoldRules } from '../api-models/claim-hold-rules.model'
import { ClaimHoldRuleses } from "../api-models/testing/fake-claim-hold-rules.model"

describe('ClaimHoldRulesService', () => {
  let injector: TestBed;
  let service: ClaimHoldRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimHoldRulesService]
    });
    injector = getTestBed();
    service = injector.get(ClaimHoldRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimHoldRuleses', () => {
    it('should return an Promise<ClaimHoldRules[]>', () => {
      const claimHoldRules = [
       {seqClhldRule:1234, claimType:'sample data', holdRule:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClhldRule:1234, claimType:'sample data', holdRule:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClhldRule:1234, claimType:'sample data', holdRule:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClaimHoldRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimholdruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimHoldRules);
    });
  });


  describe('#createClaimHoldRules', () => {
    var id = 1;
    it('should return an Promise<ClaimHoldRules>', () => {
      const claimHoldRules: ClaimHoldRules = {seqClhldRule:1234, claimType:'sample data', holdRule:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClaimHoldRules(claimHoldRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholdruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimHoldRules', () => {
    var id = 1;
    it('should return an Promise<ClaimHoldRules>', () => {
      const claimHoldRules: ClaimHoldRules = {seqClhldRule:1234, claimType:'sample data', holdRule:'sample data', reasonCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClaimHoldRules(claimHoldRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholdruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimHoldRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimHoldRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholdruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});