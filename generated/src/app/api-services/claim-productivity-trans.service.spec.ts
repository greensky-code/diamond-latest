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

import { ClaimProductivityTransService } from './claim-productivity-trans.service';
import { ClaimProductivityTrans } from '../api-models/claim-productivity-trans.model'
import { ClaimProductivityTranss } from "../api-models/testing/fake-claim-productivity-trans.model"

describe('ClaimProductivityTransService', () => {
  let injector: TestBed;
  let service: ClaimProductivityTransService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimProductivityTransService]
    });
    injector = getTestBed();
    service = injector.get(ClaimProductivityTransService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimProductivityTranss', () => {
    it('should return an Promise<ClaimProductivityTrans[]>', () => {
      const claimProductivityTrans = [
       {seqTransId:1234, transDateTime:'2018-01-01', userId:'sample data', claimType:'sample data', primaryDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', transType:'sample data', receivedDate:'2018-01-01', batchNumber:'sample data', adjudicationMethod:'sample data', seqGroupId:1234, lineOfBusiness:'sample data', originalUserId:'sample data', claimStatus:'sample data'},
       {seqTransId:1234, transDateTime:'2018-01-01', userId:'sample data', claimType:'sample data', primaryDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', transType:'sample data', receivedDate:'2018-01-01', batchNumber:'sample data', adjudicationMethod:'sample data', seqGroupId:1234, lineOfBusiness:'sample data', originalUserId:'sample data', claimStatus:'sample data'},
       {seqTransId:1234, transDateTime:'2018-01-01', userId:'sample data', claimType:'sample data', primaryDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', transType:'sample data', receivedDate:'2018-01-01', batchNumber:'sample data', adjudicationMethod:'sample data', seqGroupId:1234, lineOfBusiness:'sample data', originalUserId:'sample data', claimStatus:'sample data'}

      ];
      service.getClaimProductivityTranss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimproductivitytranss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimProductivityTrans);
    });
  });


  describe('#createClaimProductivityTrans', () => {
    var id = 1;
    it('should return an Promise<ClaimProductivityTrans>', () => {
      const claimProductivityTrans: ClaimProductivityTrans = {seqTransId:1234, transDateTime:'2018-01-01', userId:'sample data', claimType:'sample data', primaryDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', transType:'sample data', receivedDate:'2018-01-01', batchNumber:'sample data', adjudicationMethod:'sample data', seqGroupId:1234, lineOfBusiness:'sample data', originalUserId:'sample data', claimStatus:'sample data'};
      service.createClaimProductivityTrans(claimProductivityTrans).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimproductivitytranss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimProductivityTrans', () => {
    var id = 1;
    it('should return an Promise<ClaimProductivityTrans>', () => {
      const claimProductivityTrans: ClaimProductivityTrans = {seqTransId:1234, transDateTime:'2018-01-01', userId:'sample data', claimType:'sample data', primaryDate:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', transType:'sample data', receivedDate:'2018-01-01', batchNumber:'sample data', adjudicationMethod:'sample data', seqGroupId:1234, lineOfBusiness:'sample data', originalUserId:'sample data', claimStatus:'sample data'};
      service.updateClaimProductivityTrans(claimProductivityTrans, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimproductivitytranss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimProductivityTrans', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimProductivityTrans(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimproductivitytranss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});