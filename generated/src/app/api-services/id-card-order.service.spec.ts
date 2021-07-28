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

import { IdCardOrderService } from './id-card-order.service';
import { IdCardOrder } from '../api-models/id-card-order.model'
import { IdCardOrders } from "../api-models/testing/fake-id-card-order.model"

describe('IdCardOrderService', () => {
  let injector: TestBed;
  let service: IdCardOrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IdCardOrderService]
    });
    injector = getTestBed();
    service = injector.get(IdCardOrderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIdCardOrders', () => {
    it('should return an Promise<IdCardOrder[]>', () => {
      const idCardOrder = [
       {seqIdCardOrder:1234, seqEligHist:1234, seqMembId:1234, printDate:'2018-01-01', printStatus:'sample data', orderType:'sample data', orderDate:'2018-01-01', seqIdprtId:1234, benefitPackageId:'sample data'},
       {seqIdCardOrder:1234, seqEligHist:1234, seqMembId:1234, printDate:'2018-01-01', printStatus:'sample data', orderType:'sample data', orderDate:'2018-01-01', seqIdprtId:1234, benefitPackageId:'sample data'},
       {seqIdCardOrder:1234, seqEligHist:1234, seqMembId:1234, printDate:'2018-01-01', printStatus:'sample data', orderType:'sample data', orderDate:'2018-01-01', seqIdprtId:1234, benefitPackageId:'sample data'}

      ];
      service.getIdCardOrders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/idcardorders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(idCardOrder);
    });
  });


  describe('#createIdCardOrder', () => {
    var id = 1;
    it('should return an Promise<IdCardOrder>', () => {
      const idCardOrder: IdCardOrder = {seqIdCardOrder:1234, seqEligHist:1234, seqMembId:1234, printDate:'2018-01-01', printStatus:'sample data', orderType:'sample data', orderDate:'2018-01-01', seqIdprtId:1234, benefitPackageId:'sample data'};
      service.createIdCardOrder(idCardOrder).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardorders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIdCardOrder', () => {
    var id = 1;
    it('should return an Promise<IdCardOrder>', () => {
      const idCardOrder: IdCardOrder = {seqIdCardOrder:1234, seqEligHist:1234, seqMembId:1234, printDate:'2018-01-01', printStatus:'sample data', orderType:'sample data', orderDate:'2018-01-01', seqIdprtId:1234, benefitPackageId:'sample data'};
      service.updateIdCardOrder(idCardOrder, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardorders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIdCardOrder', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIdCardOrder(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardorders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});