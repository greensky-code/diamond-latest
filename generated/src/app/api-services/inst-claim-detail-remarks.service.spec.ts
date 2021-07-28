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

import { InstClaimDetailRemarksService } from './inst-claim-detail-remarks.service';
import { InstClaimDetailRemarks } from '../api-models/inst-claim-detail-remarks.model'
import { InstClaimDetailRemarkss } from "../api-models/testing/fake-inst-claim-detail-remarks.model"

describe('InstClaimDetailRemarksService', () => {
  let injector: TestBed;
  let service: InstClaimDetailRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstClaimDetailRemarksService]
    });
    injector = getTestBed();
    service = injector.get(InstClaimDetailRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getInstClaimDetailRemarkss', () => {
    it('should return an Promise<InstClaimDetailRemarks[]>', () => {
      const instClaimDetailRemarks = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getInstClaimDetailRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetailremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(instClaimDetailRemarks);
    });
  });


  describe('#createInstClaimDetailRemarks', () => {
    var id = 1;
    it('should return an Promise<InstClaimDetailRemarks>', () => {
      const instClaimDetailRemarks: InstClaimDetailRemarks = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createInstClaimDetailRemarks(instClaimDetailRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetailremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateInstClaimDetailRemarks', () => {
    var id = 1;
    it('should return an Promise<InstClaimDetailRemarks>', () => {
      const instClaimDetailRemarks: InstClaimDetailRemarks = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateInstClaimDetailRemarks(instClaimDetailRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetailremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteInstClaimDetailRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteInstClaimDetailRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimdetailremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});