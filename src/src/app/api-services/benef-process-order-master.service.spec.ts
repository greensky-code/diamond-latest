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

import { BenefProcessOrderMasterService } from './benef-process-order-master.service';
import { BenefProcessOrderMaster } from '../api-models/benef-process-order-master.model'
import { BenefProcessOrderMasters } from "../api-models/testing/fake-benef-process-order-master.model"

describe('BenefProcessOrderMasterService', () => {
  let injector: TestBed;
  let service: BenefProcessOrderMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefProcessOrderMasterService]
    });
    injector = getTestBed();
    service = injector.get(BenefProcessOrderMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefProcessOrderMasters', () => {
    it('should return an Promise<BenefProcessOrderMaster[]>', () => {
      const benefProcessOrderMaster = [
       {seqProcessingOrderId:1234, processingOrderId:'sample data', description:'sample data', defaultOrder:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProcessingOrderId:1234, processingOrderId:'sample data', description:'sample data', defaultOrder:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProcessingOrderId:1234, processingOrderId:'sample data', description:'sample data', defaultOrder:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBenefProcessOrderMasters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefprocessordermasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefProcessOrderMaster);
    });
  });


  describe('#createBenefProcessOrderMaster', () => {
    var id = 1;
    it('should return an Promise<BenefProcessOrderMaster>', () => {
      const benefProcessOrderMaster: BenefProcessOrderMaster = {seqProcessingOrderId:1234, processingOrderId:'sample data', description:'sample data', defaultOrder:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBenefProcessOrderMaster(benefProcessOrderMaster).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefprocessordermasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefProcessOrderMaster', () => {
    var id = 1;
    it('should return an Promise<BenefProcessOrderMaster>', () => {
      const benefProcessOrderMaster: BenefProcessOrderMaster = {seqProcessingOrderId:1234, processingOrderId:'sample data', description:'sample data', defaultOrder:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBenefProcessOrderMaster(benefProcessOrderMaster, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefprocessordermasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefProcessOrderMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefProcessOrderMaster(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefprocessordermasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});