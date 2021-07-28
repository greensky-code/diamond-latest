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

import { PmbEftInterfaceService } from './pmb-eft-interface.service';
import { PmbEftInterface } from '../api-models/pmb-eft-interface.model'
import { PmbEftInterfaces } from "../api-models/testing/fake-pmb-eft-interface.model"

describe('PmbEftInterfaceService', () => {
  let injector: TestBed;
  let service: PmbEftInterfaceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbEftInterfaceService]
    });
    injector = getTestBed();
    service = injector.get(PmbEftInterfaceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbEftInterfaces', () => {
    it('should return an Promise<PmbEftInterface[]>', () => {
      const pmbEftInterface = [
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', acctNo:'sample data', invoiceNo:1234, newBalance:1234, paymentDueDate:'2018-01-01', acctType:'sample data', routingNo:1234, ccExpireDate:'2018-01-01'},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', acctNo:'sample data', invoiceNo:1234, newBalance:1234, paymentDueDate:'2018-01-01', acctType:'sample data', routingNo:1234, ccExpireDate:'2018-01-01'},
       {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', acctNo:'sample data', invoiceNo:1234, newBalance:1234, paymentDueDate:'2018-01-01', acctType:'sample data', routingNo:1234, ccExpireDate:'2018-01-01'}

      ];
      service.getPmbEftInterfaces().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbeftinterfaces/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbEftInterface);
    });
  });


  describe('#createPmbEftInterface', () => {
    var id = 1;
    it('should return an Promise<PmbEftInterface>', () => {
      const pmbEftInterface: PmbEftInterface = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', acctNo:'sample data', invoiceNo:1234, newBalance:1234, paymentDueDate:'2018-01-01', acctType:'sample data', routingNo:1234, ccExpireDate:'2018-01-01'};
      service.createPmbEftInterface(pmbEftInterface).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbeftinterfaces`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbEftInterface', () => {
    var id = 1;
    it('should return an Promise<PmbEftInterface>', () => {
      const pmbEftInterface: PmbEftInterface = {seqGpbilId:1234, customerType:'sample data', customerId:'sample data', acctNo:'sample data', invoiceNo:1234, newBalance:1234, paymentDueDate:'2018-01-01', acctType:'sample data', routingNo:1234, ccExpireDate:'2018-01-01'};
      service.updatePmbEftInterface(pmbEftInterface, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbeftinterfaces/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbEftInterface', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbEftInterface(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbeftinterfaces/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});