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

import { ProfsvcClaimHdrRemarksService } from './profsvc-claim-hdr-remarks.service';
import { ProfsvcClaimHdrRemarks } from '../api-models/profsvc-claim-hdr-remarks.model'
import { ProfsvcClaimHdrRemarkss } from "../api-models/testing/fake-profsvc-claim-hdr-remarks.model"

describe('ProfsvcClaimHdrRemarksService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimHdrRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimHdrRemarksService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimHdrRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimHdrRemarkss', () => {
    it('should return an Promise<ProfsvcClaimHdrRemarks[]>', () => {
      const profsvcClaimHdrRemarks = [
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProfsvcClaimHdrRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimhdrremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimHdrRemarks);
    });
  });


  describe('#createProfsvcClaimHdrRemarks', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimHdrRemarks>', () => {
      const profsvcClaimHdrRemarks: ProfsvcClaimHdrRemarks = {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProfsvcClaimHdrRemarks(profsvcClaimHdrRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimhdrremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimHdrRemarks', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimHdrRemarks>', () => {
      const profsvcClaimHdrRemarks: ProfsvcClaimHdrRemarks = {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProfsvcClaimHdrRemarks(profsvcClaimHdrRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimhdrremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimHdrRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimHdrRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimhdrremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});