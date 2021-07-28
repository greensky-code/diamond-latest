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

import { GetCoverStatusService } from './get-cover-status.service';
import { GetCoverStatus } from '../api-models/get-cover-status.model'
import { GetCoverStatu } from "../api-models/testing/fake-get-cover-status.model"

describe('GetCoverStatusService', () => {
  let injector: TestBed;
  let service: GetCoverStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetCoverStatusService]
    });
    injector = getTestBed();
    service = injector.get(GetCoverStatusService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetCoverStatu', () => {
    it('should return an Promise<GetCoverStatus[]>', () => {
      const getCoverStatus = [
       {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data'},
       {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data'},
       {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data'}

      ];
      service.getGetCoverStatu().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getcoverstatu/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getCoverStatus);
    });
  });


  describe('#createGetCoverStatus', () => {
    var id = 1;
    it('should return an Promise<GetCoverStatus>', () => {
      const getCoverStatus: GetCoverStatus = {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data'};
      service.createGetCoverStatus(getCoverStatus).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcoverstatu`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetCoverStatus', () => {
    var id = 1;
    it('should return an Promise<GetCoverStatus>', () => {
      const getCoverStatus: GetCoverStatus = {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data'};
      service.updateGetCoverStatus(getCoverStatus, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcoverstatu/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetCoverStatus', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetCoverStatus(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcoverstatu/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});