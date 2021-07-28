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

import { FuncConvertNumService } from './func-convert-num.service';
import { FuncConvertNum } from '../api-models/func-convert-num.model'
import { FuncConvertNums } from "../api-models/testing/fake-func-convert-num.model"

describe('FuncConvertNumService', () => {
  let injector: TestBed;
  let service: FuncConvertNumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncConvertNumService]
    });
    injector = getTestBed();
    service = injector.get(FuncConvertNumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncConvertNums', () => {
    it('should return an Promise<FuncConvertNum[]>', () => {
      const funcConvertNum = [
       {pStrnum:'sample data', pStrformat:'sample data'},
       {pStrnum:'sample data', pStrformat:'sample data'},
       {pStrnum:'sample data', pStrformat:'sample data'}

      ];
      service.getFuncConvertNums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertnums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcConvertNum);
    });
  });


  describe('#createFuncConvertNum', () => {
    var id = 1;
    it('should return an Promise<FuncConvertNum>', () => {
      const funcConvertNum: FuncConvertNum = {pStrnum:'sample data', pStrformat:'sample data'};
      service.createFuncConvertNum(funcConvertNum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertnums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncConvertNum', () => {
    var id = 1;
    it('should return an Promise<FuncConvertNum>', () => {
      const funcConvertNum: FuncConvertNum = {pStrnum:'sample data', pStrformat:'sample data'};
      service.updateFuncConvertNum(funcConvertNum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertnums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncConvertNum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncConvertNum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertnums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});