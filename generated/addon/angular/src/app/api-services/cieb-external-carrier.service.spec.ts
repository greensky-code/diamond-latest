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

import { CiebExternalCarrierService } from './cieb-external-carrier.service';
import { CiebExternalCarrier } from '../api-models/cieb-external-carrier.model'
import { CiebExternalCarriers } from "../api-models/testing/fake-cieb-external-carrier.model"

describe('CiebExternalCarrierService', () => {
  let injector: TestBed;
  let service: CiebExternalCarrierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebExternalCarrierService]
    });
    injector = getTestBed();
    service = injector.get(CiebExternalCarrierService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebExternalCarriers', () => {
    it('should return an Promise<CiebExternalCarrier[]>', () => {
      const ciebExternalCarrier = [
       {seqExtnId:1234, seqPremId:1234, extnCarrGroupId:'sample data', productType:'sample data', extnCarrName:'sample data', extnCarrId:'sample data', sharMethod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sharBenType:'sample data'},
       {seqExtnId:1234, seqPremId:1234, extnCarrGroupId:'sample data', productType:'sample data', extnCarrName:'sample data', extnCarrId:'sample data', sharMethod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sharBenType:'sample data'},
       {seqExtnId:1234, seqPremId:1234, extnCarrGroupId:'sample data', productType:'sample data', extnCarrName:'sample data', extnCarrId:'sample data', sharMethod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sharBenType:'sample data'}

      ];
      service.getCiebExternalCarriers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebexternalcarriers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebExternalCarrier);
    });
  });


  describe('#createCiebExternalCarrier', () => {
    var id = 1;
    it('should return an Promise<CiebExternalCarrier>', () => {
      const ciebExternalCarrier: CiebExternalCarrier = {seqExtnId:1234, seqPremId:1234, extnCarrGroupId:'sample data', productType:'sample data', extnCarrName:'sample data', extnCarrId:'sample data', sharMethod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sharBenType:'sample data'};
      service.createCiebExternalCarrier(ciebExternalCarrier).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebexternalcarriers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebExternalCarrier', () => {
    var id = 1;
    it('should return an Promise<CiebExternalCarrier>', () => {
      const ciebExternalCarrier: CiebExternalCarrier = {seqExtnId:1234, seqPremId:1234, extnCarrGroupId:'sample data', productType:'sample data', extnCarrName:'sample data', extnCarrId:'sample data', sharMethod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', sharBenType:'sample data'};
      service.updateCiebExternalCarrier(ciebExternalCarrier, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebexternalcarriers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebExternalCarrier', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebExternalCarrier(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebexternalcarriers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});