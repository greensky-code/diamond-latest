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

import { NdcCodeMasterService } from './ndc-code-master.service';
import { NdcCodeMaster } from '../api-models/ndc-code-master.model'
import { NdcCodeMasters } from "../api-models/testing/fake-ndc-code-master.model"

describe('NdcCodeMasterService', () => {
  let injector: TestBed;
  let service: NdcCodeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NdcCodeMasterService]
    });
    injector = getTestBed();
    service = injector.get(NdcCodeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNdcCodeMasters', () => {
    it('should return an Promise<NdcCodeMaster[]>', () => {
      const ndcCodeMaster = [
       {ndcCode:'sample data', description:'sample data', effectiveDate:'2018-01-01', terminateDate:'2018-01-01', avgWholesalePrice:1234, drugClass:'sample data', codeQualifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ndcCode:'sample data', description:'sample data', effectiveDate:'2018-01-01', terminateDate:'2018-01-01', avgWholesalePrice:1234, drugClass:'sample data', codeQualifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {ndcCode:'sample data', description:'sample data', effectiveDate:'2018-01-01', terminateDate:'2018-01-01', avgWholesalePrice:1234, drugClass:'sample data', codeQualifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getNdcCodeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ndccodemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ndcCodeMaster);
    });
  });


  describe('#createNdcCodeMaster', () => {
    var id = 1;
    it('should return an Promise<NdcCodeMaster>', () => {
      const ndcCodeMaster: NdcCodeMaster = {ndcCode:'sample data', description:'sample data', effectiveDate:'2018-01-01', terminateDate:'2018-01-01', avgWholesalePrice:1234, drugClass:'sample data', codeQualifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createNdcCodeMaster(ndcCodeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ndccodemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNdcCodeMaster', () => {
    var id = 1;
    it('should return an Promise<NdcCodeMaster>', () => {
      const ndcCodeMaster: NdcCodeMaster = {ndcCode:'sample data', description:'sample data', effectiveDate:'2018-01-01', terminateDate:'2018-01-01', avgWholesalePrice:1234, drugClass:'sample data', codeQualifier:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateNdcCodeMaster(ndcCodeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ndccodemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNdcCodeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNdcCodeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ndccodemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});