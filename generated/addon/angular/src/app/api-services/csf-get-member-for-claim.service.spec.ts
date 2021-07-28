/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CsfGetMemberForClaimService } from './csf-get-member-for-claim.service';
import { CsfGetMemberForClaim } from '../api-models/csf-get-member-for-claim.model'
import { CsfGetMemberForClaims } from "../api-models/testing/fake-csf-get-member-for-claim.model"

describe('CsfGetMemberForClaimService', () => {
  let injector: TestBed;
  let service: CsfGetMemberForClaimService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetMemberForClaimService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetMemberForClaimService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetMemberForClaims', () => {
    it('should return an Promise<CsfGetMemberForClaim[]>', () => {
      const csfGetMemberForClaim = [
       {pSeqClaimId:1234},
       {pSeqClaimId:1234},
       {pSeqClaimId:1234}

      ];
      service.getCsfGetMemberForClaims().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetmemberforclaims/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetMemberForClaim);
    });
  });


  describe('#createCsfGetMemberForClaim', () => {
    var id = 1;
    it('should return an Promise<CsfGetMemberForClaim>', () => {
      const csfGetMemberForClaim: CsfGetMemberForClaim = {pSeqClaimId:1234};
      service.createCsfGetMemberForClaim(csfGetMemberForClaim).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetmemberforclaims`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetMemberForClaim', () => {
    var id = 1;
    it('should return an Promise<CsfGetMemberForClaim>', () => {
      const csfGetMemberForClaim: CsfGetMemberForClaim = {pSeqClaimId:1234};
      service.updateCsfGetMemberForClaim(csfGetMemberForClaim, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetmemberforclaims/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetMemberForClaim', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetMemberForClaim(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetmemberforclaims/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});