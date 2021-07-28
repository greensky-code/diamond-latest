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

import { GetNetwIndService } from './get-netw-ind.service';
import { GetNetwInd } from '../api-models/get-netw-ind.model'
import { GetNetwInds } from "../api-models/testing/fake-get-netw-ind.model"

describe('GetNetwIndService', () => {
  let injector: TestBed;
  let service: GetNetwIndService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetNetwIndService]
    });
    injector = getTestBed();
    service = injector.get(GetNetwIndService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetNetwInds', () => {
    it('should return an Promise<GetNetwInd[]>', () => {
      const getNetwInd = [
       {pType:'sample data', pOperator:'sample data', pFromValue:'sample data', pPnCnt:1234, pTypePCnt:1234},
       {pType:'sample data', pOperator:'sample data', pFromValue:'sample data', pPnCnt:1234, pTypePCnt:1234},
       {pType:'sample data', pOperator:'sample data', pFromValue:'sample data', pPnCnt:1234, pTypePCnt:1234}

      ];
      service.getGetNetwInds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwinds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getNetwInd);
    });
  });


  describe('#createGetNetwInd', () => {
    var id = 1;
    it('should return an Promise<GetNetwInd>', () => {
      const getNetwInd: GetNetwInd = {pType:'sample data', pOperator:'sample data', pFromValue:'sample data', pPnCnt:1234, pTypePCnt:1234};
      service.createGetNetwInd(getNetwInd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwinds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetNetwInd', () => {
    var id = 1;
    it('should return an Promise<GetNetwInd>', () => {
      const getNetwInd: GetNetwInd = {pType:'sample data', pOperator:'sample data', pFromValue:'sample data', pPnCnt:1234, pTypePCnt:1234};
      service.updateGetNetwInd(getNetwInd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwinds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetNetwInd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetNetwInd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwinds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});