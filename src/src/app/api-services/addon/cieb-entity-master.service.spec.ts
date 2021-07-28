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

import { CiebEntityMasterService } from './cieb-entity-master.service';
import { CiebEntityMaster } from '../api-models/cieb-entity-master.model'
import { CiebEntityMasters } from "../api-models/testing/fake-cieb-entity-master.model"

describe('CiebEntityMasterService', () => {
  let injector: TestBed;
  let service: CiebEntityMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebEntityMasterService]
    });
    injector = getTestBed();
    service = injector.get(CiebEntityMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebEntityMasters', () => {
    it('should return an Promise<CiebEntityMaster[]>', () => {
      const ciebEntityMaster = [
       {seqEntityId:1234, entityCode:'sample data', seqMembId:1234, seqSubsId:1234, seqGroupId:1234, seqCompanyId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqVendAddress:1234},
       {seqEntityId:1234, entityCode:'sample data', seqMembId:1234, seqSubsId:1234, seqGroupId:1234, seqCompanyId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqVendAddress:1234},
       {seqEntityId:1234, entityCode:'sample data', seqMembId:1234, seqSubsId:1234, seqGroupId:1234, seqCompanyId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqVendAddress:1234}

      ];
      service.getCiebEntityMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebentitymasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebEntityMaster);
    });
  });


  describe('#createCiebEntityMaster', () => {
    var id = 1;
    it('should return an Promise<CiebEntityMaster>', () => {
      const ciebEntityMaster: CiebEntityMaster = {seqEntityId:1234, entityCode:'sample data', seqMembId:1234, seqSubsId:1234, seqGroupId:1234, seqCompanyId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqVendAddress:1234};
      service.createCiebEntityMaster(ciebEntityMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebentitymasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebEntityMaster', () => {
    var id = 1;
    it('should return an Promise<CiebEntityMaster>', () => {
      const ciebEntityMaster: CiebEntityMaster = {seqEntityId:1234, entityCode:'sample data', seqMembId:1234, seqSubsId:1234, seqGroupId:1234, seqCompanyId:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqVendAddress:1234};
      service.updateCiebEntityMaster(ciebEntityMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebentitymasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebEntityMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebEntityMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebentitymasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});