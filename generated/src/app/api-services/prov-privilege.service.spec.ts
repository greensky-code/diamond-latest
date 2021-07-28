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

import { ProvPrivilegeService } from './prov-privilege.service';
import { ProvPrivilege } from '../api-models/prov-privilege.model'
import { ProvPrivileges } from "../api-models/testing/fake-prov-privilege.model"

describe('ProvPrivilegeService', () => {
  let injector: TestBed;
  let service: ProvPrivilegeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvPrivilegeService]
    });
    injector = getTestBed();
    service = injector.get(ProvPrivilegeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvPrivileges', () => {
    it('should return an Promise<ProvPrivilege[]>', () => {
      const provPrivilege = [
       {seqProvPrivilege:1234, seqProvId:1234, seqHospId:1234, effectiveDate:'2018-01-01', expirationDate:'2018-01-01', userDefined:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', privilegeType:'sample data'},
       {seqProvPrivilege:1234, seqProvId:1234, seqHospId:1234, effectiveDate:'2018-01-01', expirationDate:'2018-01-01', userDefined:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', privilegeType:'sample data'},
       {seqProvPrivilege:1234, seqProvId:1234, seqHospId:1234, effectiveDate:'2018-01-01', expirationDate:'2018-01-01', userDefined:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', privilegeType:'sample data'}

      ];
      service.getProvPrivileges().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provprivileges/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provPrivilege);
    });
  });


  describe('#createProvPrivilege', () => {
    var id = 1;
    it('should return an Promise<ProvPrivilege>', () => {
      const provPrivilege: ProvPrivilege = {seqProvPrivilege:1234, seqProvId:1234, seqHospId:1234, effectiveDate:'2018-01-01', expirationDate:'2018-01-01', userDefined:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', privilegeType:'sample data'};
      service.createProvPrivilege(provPrivilege).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provprivileges`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvPrivilege', () => {
    var id = 1;
    it('should return an Promise<ProvPrivilege>', () => {
      const provPrivilege: ProvPrivilege = {seqProvPrivilege:1234, seqProvId:1234, seqHospId:1234, effectiveDate:'2018-01-01', expirationDate:'2018-01-01', userDefined:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', privilegeType:'sample data'};
      service.updateProvPrivilege(provPrivilege, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provprivileges/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvPrivilege', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvPrivilege(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provprivileges/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});