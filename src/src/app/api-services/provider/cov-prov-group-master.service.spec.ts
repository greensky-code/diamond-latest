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

import { CovProvGroupMasterService } from './cov-prov-group-master.service';
import { CovProvGroupMaster } from '../api-models/cov-prov-group-master.model'
import { CovProvGroupMasters } from "../api-models/testing/fake-cov-prov-group-master.model"

describe('CovProvGroupMasterService', () => {
  let injector: TestBed;
  let service: CovProvGroupMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CovProvGroupMasterService]
    });
    injector = getTestBed();
    service = injector.get(CovProvGroupMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCovProvGroupMasters', () => {
    it('should return an Promise<CovProvGroupMaster[]>', () => {
      const covProvGroupMaster = [
       {seqCovProvGrp:1234, covProvGrpId:'sample data', shortDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCovProvGrp:1234, covProvGrpId:'sample data', shortDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCovProvGrp:1234, covProvGrpId:'sample data', shortDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCovProvGroupMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(covProvGroupMaster);
    });
  });


  describe('#createCovProvGroupMaster', () => {
    var id = 1;
    it('should return an Promise<CovProvGroupMaster>', () => {
      const covProvGroupMaster: CovProvGroupMaster = {seqCovProvGrp:1234, covProvGrpId:'sample data', shortDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCovProvGroupMaster(covProvGroupMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCovProvGroupMaster', () => {
    var id = 1;
    it('should return an Promise<CovProvGroupMaster>', () => {
      const covProvGroupMaster: CovProvGroupMaster = {seqCovProvGrp:1234, covProvGrpId:'sample data', shortDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCovProvGroupMaster(covProvGroupMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCovProvGroupMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCovProvGroupMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});