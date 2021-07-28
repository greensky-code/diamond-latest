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

import { ClaimHoldDeterminantsService } from './claim-hold-determinants.service';
import { ClaimHoldDeterminants } from '../api-models/claim-hold-determinants.model'
import { ClaimHoldDeterminantss } from "../api-models/testing/fake-claim-hold-determinants.model"

describe('ClaimHoldDeterminantsService', () => {
  let injector: TestBed;
  let service: ClaimHoldDeterminantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimHoldDeterminantsService]
    });
    injector = getTestBed();
    service = injector.get(ClaimHoldDeterminantsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimHoldDeterminantss', () => {
    it('should return an Promise<ClaimHoldDeterminants[]>', () => {
      const claimHoldDeterminants = [
       {seqClhldRule:1234, determinantColumnNo:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClhldRule:1234, determinantColumnNo:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClhldRule:1234, determinantColumnNo:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClaimHoldDeterminantss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddeterminantss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimHoldDeterminants);
    });
  });


  describe('#createClaimHoldDeterminants', () => {
    var id = 1;
    it('should return an Promise<ClaimHoldDeterminants>', () => {
      const claimHoldDeterminants: ClaimHoldDeterminants = {seqClhldRule:1234, determinantColumnNo:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClaimHoldDeterminants(claimHoldDeterminants).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddeterminantss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimHoldDeterminants', () => {
    var id = 1;
    it('should return an Promise<ClaimHoldDeterminants>', () => {
      const claimHoldDeterminants: ClaimHoldDeterminants = {seqClhldRule:1234, determinantColumnNo:1234, determinantTable:'sample data', determinant:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClaimHoldDeterminants(claimHoldDeterminants, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddeterminantss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimHoldDeterminants', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimHoldDeterminants(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddeterminantss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});