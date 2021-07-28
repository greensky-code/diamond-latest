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

import { ArCustomerMasterService } from './ar-customer-master.service';
import { ArCustomerMaster } from '../api-models/ar-customer-master.model'
import { ArCustomerMasters } from "../api-models/testing/fake-ar-customer-master.model"

describe('ArCustomerMasterService', () => {
  let injector: TestBed;
  let service: ArCustomerMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArCustomerMasterService]
    });
    injector = getTestBed();
    service = injector.get(ArCustomerMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArCustomerMasters', () => {
    it('should return an Promise<ArCustomerMaster[]>', () => {
      const arCustomerMaster = [
       {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getArCustomerMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/arcustomermasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arCustomerMaster);
    });
  });


  describe('#createArCustomerMaster', () => {
    var id = 1;
    it('should return an Promise<ArCustomerMaster>', () => {
      const arCustomerMaster: ArCustomerMaster = {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createArCustomerMaster(arCustomerMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcustomermasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArCustomerMaster', () => {
    var id = 1;
    it('should return an Promise<ArCustomerMaster>', () => {
      const arCustomerMaster: ArCustomerMaster = {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateArCustomerMaster(arCustomerMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcustomermasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArCustomerMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArCustomerMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcustomermasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});