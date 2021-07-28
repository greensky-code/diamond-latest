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

import { PmbArCustomerMasterService } from './pmb-ar-customer-master.service';
import { PmbArCustomerMaster } from '../api-models/pmb-ar-customer-master.model'
import { PmbArCustomerMasters } from "../api-models/testing/fake-pmb-ar-customer-master.model"

describe('PmbArCustomerMasterService', () => {
  let injector: TestBed;
  let service: PmbArCustomerMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbArCustomerMasterService]
    });
    injector = getTestBed();
    service = injector.get(PmbArCustomerMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbArCustomerMasters', () => {
    it('should return an Promise<PmbArCustomerMaster[]>', () => {
      const pmbArCustomerMaster = [
       {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', useEftFlg:'sample data', country:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', useEftFlg:'sample data', country:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', useEftFlg:'sample data', country:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPmbArCustomerMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustomermasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbArCustomerMaster);
    });
  });


  describe('#createPmbArCustomerMaster', () => {
    var id = 1;
    it('should return an Promise<PmbArCustomerMaster>', () => {
      const pmbArCustomerMaster: PmbArCustomerMaster = {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', useEftFlg:'sample data', country:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPmbArCustomerMaster(pmbArCustomerMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustomermasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbArCustomerMaster', () => {
    var id = 1;
    it('should return an Promise<PmbArCustomerMaster>', () => {
      const pmbArCustomerMaster: PmbArCustomerMaster = {customerType:'sample data', customerId:'sample data', shortName:'sample data', customerName1:'sample data', customerName2:'sample data', customerAddrLine1:'sample data', customerAddrLine2:'sample data', customerCity:'sample data', customerState:'sample data', customerPostalCode:'sample data', useEftFlg:'sample data', country:'sample data', userDefined1:'sample data', userDefined2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePmbArCustomerMaster(pmbArCustomerMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustomermasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbArCustomerMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbArCustomerMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbarcustomermasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});