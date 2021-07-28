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

import { FuncGetClmNetworkTypeService } from './func-get-clm-network-type.service';
import { FuncGetClmNetworkType } from '../api-models/func-get-clm-network-type.model'
import { FuncGetClmNetworkTypes } from "../api-models/testing/fake-func-get-clm-network-type.model"

describe('FuncGetClmNetworkTypeService', () => {
  let injector: TestBed;
  let service: FuncGetClmNetworkTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncGetClmNetworkTypeService]
    });
    injector = getTestBed();
    service = injector.get(FuncGetClmNetworkTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncGetClmNetworkTypes', () => {
    it('should return an Promise<FuncGetClmNetworkType[]>', () => {
      const funcGetClmNetworkType = [
       {pSeqClaimId:1234, pFileType:'sample data'},
       {pSeqClaimId:1234, pFileType:'sample data'},
       {pSeqClaimId:1234, pFileType:'sample data'}

      ];
      service.getFuncGetClmNetworkTypes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetclmnetworktypes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcGetClmNetworkType);
    });
  });


  describe('#createFuncGetClmNetworkType', () => {
    var id = 1;
    it('should return an Promise<FuncGetClmNetworkType>', () => {
      const funcGetClmNetworkType: FuncGetClmNetworkType = {pSeqClaimId:1234, pFileType:'sample data'};
      service.createFuncGetClmNetworkType(funcGetClmNetworkType).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetclmnetworktypes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncGetClmNetworkType', () => {
    var id = 1;
    it('should return an Promise<FuncGetClmNetworkType>', () => {
      const funcGetClmNetworkType: FuncGetClmNetworkType = {pSeqClaimId:1234, pFileType:'sample data'};
      service.updateFuncGetClmNetworkType(funcGetClmNetworkType, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetclmnetworktypes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncGetClmNetworkType', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncGetClmNetworkType(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcgetclmnetworktypes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});