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

import { ClaimsTransmittalSetupService } from './claims-transmittal-setup.service';
import { ClaimsTransmittalSetup } from '../api-models/claims-transmittal-setup.model'
import { ClaimsTransmittalSetups } from "../api-models/testing/fake-claims-transmittal-setup.model"

describe('ClaimsTransmittalSetupService', () => {
  let injector: TestBed;
  let service: ClaimsTransmittalSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimsTransmittalSetupService]
    });
    injector = getTestBed();
    service = injector.get(ClaimsTransmittalSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimsTransmittalSetups', () => {
    it('should return an Promise<ClaimsTransmittalSetup[]>', () => {
      const claimsTransmittalSetup = [
       {seqCltrnId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', companyCode:'sample data', fileType:'sample data', includeHolds:'sample data', fromVendorId:'sample data', throughVendorId:'sample data', fromBatchNumber:'sample data', throughBatchNumber:'sample data', fromClaimNumber:'sample data', throughClaimNumber:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'},
       {seqCltrnId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', companyCode:'sample data', fileType:'sample data', includeHolds:'sample data', fromVendorId:'sample data', throughVendorId:'sample data', fromBatchNumber:'sample data', throughBatchNumber:'sample data', fromClaimNumber:'sample data', throughClaimNumber:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'},
       {seqCltrnId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', companyCode:'sample data', fileType:'sample data', includeHolds:'sample data', fromVendorId:'sample data', throughVendorId:'sample data', fromBatchNumber:'sample data', throughBatchNumber:'sample data', fromClaimNumber:'sample data', throughClaimNumber:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'}

      ];
      service.getClaimsTransmittalSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittalsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimsTransmittalSetup);
    });
  });


  describe('#createClaimsTransmittalSetup', () => {
    var id = 1;
    it('should return an Promise<ClaimsTransmittalSetup>', () => {
      const claimsTransmittalSetup: ClaimsTransmittalSetup = {seqCltrnId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', companyCode:'sample data', fileType:'sample data', includeHolds:'sample data', fromVendorId:'sample data', throughVendorId:'sample data', fromBatchNumber:'sample data', throughBatchNumber:'sample data', fromClaimNumber:'sample data', throughClaimNumber:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'};
      service.createClaimsTransmittalSetup(claimsTransmittalSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittalsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimsTransmittalSetup', () => {
    var id = 1;
    it('should return an Promise<ClaimsTransmittalSetup>', () => {
      const claimsTransmittalSetup: ClaimsTransmittalSetup = {seqCltrnId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', companyCode:'sample data', fileType:'sample data', includeHolds:'sample data', fromVendorId:'sample data', throughVendorId:'sample data', fromBatchNumber:'sample data', throughBatchNumber:'sample data', fromClaimNumber:'sample data', throughClaimNumber:'sample data', reprintRequest:'sample data', reprintDate:'2018-01-01', status:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', template:'sample data', inProcess:'sample data'};
      service.updateClaimsTransmittalSetup(claimsTransmittalSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittalsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimsTransmittalSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimsTransmittalSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittalsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});