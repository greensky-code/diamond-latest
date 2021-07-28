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

import { CspExecuteAlgorithmService } from './csp-execute-algorithm.service';
import { CspExecuteAlgorithm } from '../api-models/csp-execute-algorithm.model'
import { CspExecuteAlgorithms } from "../api-models/testing/fake-csp-execute-algorithm.model"

describe('CspExecuteAlgorithmService', () => {
  let injector: TestBed;
  let service: CspExecuteAlgorithmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspExecuteAlgorithmService]
    });
    injector = getTestBed();
    service = injector.get(CspExecuteAlgorithmService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspExecuteAlgorithms', () => {
    it('should return an Promise<CspExecuteAlgorithm[]>', () => {
      const cspExecuteAlgorithm = [
       {pSeqEntityId:1234, pDocCode:'sample data', pCwwClaimInd:1234, pAddrId:1234, pAddrSource:'sample data', pAddrCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'},
       {pSeqEntityId:1234, pDocCode:'sample data', pCwwClaimInd:1234, pAddrId:1234, pAddrSource:'sample data', pAddrCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'},
       {pSeqEntityId:1234, pDocCode:'sample data', pCwwClaimInd:1234, pAddrId:1234, pAddrSource:'sample data', pAddrCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'}

      ];
      service.getCspExecuteAlgorithms().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspexecutealgorithms/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspExecuteAlgorithm);
    });
  });


  describe('#createCspExecuteAlgorithm', () => {
    var id = 1;
    it('should return an Promise<CspExecuteAlgorithm>', () => {
      const cspExecuteAlgorithm: CspExecuteAlgorithm = {pSeqEntityId:1234, pDocCode:'sample data', pCwwClaimInd:1234, pAddrId:1234, pAddrSource:'sample data', pAddrCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'};
      service.createCspExecuteAlgorithm(cspExecuteAlgorithm).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspexecutealgorithms`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspExecuteAlgorithm', () => {
    var id = 1;
    it('should return an Promise<CspExecuteAlgorithm>', () => {
      const cspExecuteAlgorithm: CspExecuteAlgorithm = {pSeqEntityId:1234, pDocCode:'sample data', pCwwClaimInd:1234, pAddrId:1234, pAddrSource:'sample data', pAddrCode:'sample data', pAddrIdList:'sample data', pAddrSourceList:'sample data', pAddrCodeList:'sample data', pAddrFlagList:'sample data'};
      service.updateCspExecuteAlgorithm(cspExecuteAlgorithm, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspexecutealgorithms/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspExecuteAlgorithm', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspExecuteAlgorithm(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspexecutealgorithms/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});