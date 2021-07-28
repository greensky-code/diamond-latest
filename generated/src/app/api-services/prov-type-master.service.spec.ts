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

import { ProvTypeMasterService } from './prov-type-master.service';
import { ProvTypeMaster } from '../api-models/prov-type-master.model'
import { ProvTypeMasters } from "../api-models/testing/fake-prov-type-master.model"

describe('ProvTypeMasterService', () => {
  let injector: TestBed;
  let service: ProvTypeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvTypeMasterService]
    });
    injector = getTestBed();
    service = injector.get(ProvTypeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvTypeMasters', () => {
    it('should return an Promise<ProvTypeMaster[]>', () => {
      const provTypeMaster = [
       {typeOrSpecCode:'sample data', typeOrSpecialty:'sample data', shortDescription:'sample data', description:'sample data', autoAuditSpecCod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {typeOrSpecCode:'sample data', typeOrSpecialty:'sample data', shortDescription:'sample data', description:'sample data', autoAuditSpecCod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {typeOrSpecCode:'sample data', typeOrSpecialty:'sample data', shortDescription:'sample data', description:'sample data', autoAuditSpecCod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvTypeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provtypemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provTypeMaster);
    });
  });


  describe('#createProvTypeMaster', () => {
    var id = 1;
    it('should return an Promise<ProvTypeMaster>', () => {
      const provTypeMaster: ProvTypeMaster = {typeOrSpecCode:'sample data', typeOrSpecialty:'sample data', shortDescription:'sample data', description:'sample data', autoAuditSpecCod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvTypeMaster(provTypeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provtypemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvTypeMaster', () => {
    var id = 1;
    it('should return an Promise<ProvTypeMaster>', () => {
      const provTypeMaster: ProvTypeMaster = {typeOrSpecCode:'sample data', typeOrSpecialty:'sample data', shortDescription:'sample data', description:'sample data', autoAuditSpecCod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvTypeMaster(provTypeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provtypemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvTypeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvTypeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provtypemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});