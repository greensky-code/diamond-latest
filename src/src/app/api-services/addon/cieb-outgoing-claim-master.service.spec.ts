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

import { CiebOutgoingClaimMasterService } from './cieb-outgoing-claim-master.service';
import { CiebOutgoingClaimMaster } from '../api-models/cieb-outgoing-claim-master.model'
import { CiebOutgoingClaimMasters } from "../api-models/testing/fake-cieb-outgoing-claim-master.model"

describe('CiebOutgoingClaimMasterService', () => {
  let injector: TestBed;
  let service: CiebOutgoingClaimMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebOutgoingClaimMasterService]
    });
    injector = getTestBed();
    service = injector.get(CiebOutgoingClaimMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebOutgoingClaimMasters', () => {
    it('should return an Promise<CiebOutgoingClaimMaster[]>', () => {
      const ciebOutgoingClaimMaster = [
       {seqClaimId:1234, claimType:'sample data', paySubFlg:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, claimType:'sample data', paySubFlg:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, claimType:'sample data', paySubFlg:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebOutgoingClaimMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingclaimmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebOutgoingClaimMaster);
    });
  });


  describe('#createCiebOutgoingClaimMaster', () => {
    var id = 1;
    it('should return an Promise<CiebOutgoingClaimMaster>', () => {
      const ciebOutgoingClaimMaster: CiebOutgoingClaimMaster = {seqClaimId:1234, claimType:'sample data', paySubFlg:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebOutgoingClaimMaster(ciebOutgoingClaimMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingclaimmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebOutgoingClaimMaster', () => {
    var id = 1;
    it('should return an Promise<CiebOutgoingClaimMaster>', () => {
      const ciebOutgoingClaimMaster: CiebOutgoingClaimMaster = {seqClaimId:1234, claimType:'sample data', paySubFlg:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebOutgoingClaimMaster(ciebOutgoingClaimMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingclaimmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebOutgoingClaimMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebOutgoingClaimMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cieboutgoingclaimmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});