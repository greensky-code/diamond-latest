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

import { CapTransYtdService } from './cap-trans-ytd.service';
import { CapTransYtd } from '../api-models/cap-trans-ytd.model'
import { CapTransYtds } from "../api-models/testing/fake-cap-trans-ytd.model"

describe('CapTransYtdService', () => {
  let injector: TestBed;
  let service: CapTransYtdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapTransYtdService]
    });
    injector = getTestBed();
    service = injector.get(CapTransYtdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapTransYtds', () => {
    it('should return an Promise<CapTransYtd[]>', () => {
      const capTransYtd = [
       {seqCapTransYtd:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', capTransYtdAmt:1234, pmpmWitholdAmt:1234},
       {seqCapTransYtd:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', capTransYtdAmt:1234, pmpmWitholdAmt:1234},
       {seqCapTransYtd:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', capTransYtdAmt:1234, pmpmWitholdAmt:1234}

      ];
      service.getCapTransYtds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/captransytds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capTransYtd);
    });
  });


  describe('#createCapTransYtd', () => {
    var id = 1;
    it('should return an Promise<CapTransYtd>', () => {
      const capTransYtd: CapTransYtd = {seqCapTransYtd:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', capTransYtdAmt:1234, pmpmWitholdAmt:1234};
      service.createCapTransYtd(capTransYtd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captransytds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapTransYtd', () => {
    var id = 1;
    it('should return an Promise<CapTransYtd>', () => {
      const capTransYtd: CapTransYtd = {seqCapTransYtd:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', capTransYtdAmt:1234, pmpmWitholdAmt:1234};
      service.updateCapTransYtd(capTransYtd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captransytds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapTransYtd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapTransYtd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captransytds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});