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

import { FuncChkPlanCodeService } from './func-chk-plan-code.service';
import { FuncChkPlanCode } from '../api-models/func-chk-plan-code.model'
import { FuncChkPlanCodes } from "../api-models/testing/fake-func-chk-plan-code.model"

describe('FuncChkPlanCodeService', () => {
  let injector: TestBed;
  let service: FuncChkPlanCodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncChkPlanCodeService]
    });
    injector = getTestBed();
    service = injector.get(FuncChkPlanCodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncChkPlanCodes', () => {
    it('should return an Promise<FuncChkPlanCode[]>', () => {
      const funcChkPlanCode = [
       {pGroupId:'sample data'},
       {pGroupId:'sample data'},
       {pGroupId:'sample data'}

      ];
      service.getFuncChkPlanCodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcchkplancodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcChkPlanCode);
    });
  });


  describe('#createFuncChkPlanCode', () => {
    var id = 1;
    it('should return an Promise<FuncChkPlanCode>', () => {
      const funcChkPlanCode: FuncChkPlanCode = {pGroupId:'sample data'};
      service.createFuncChkPlanCode(funcChkPlanCode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcchkplancodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncChkPlanCode', () => {
    var id = 1;
    it('should return an Promise<FuncChkPlanCode>', () => {
      const funcChkPlanCode: FuncChkPlanCode = {pGroupId:'sample data'};
      service.updateFuncChkPlanCode(funcChkPlanCode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcchkplancodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncChkPlanCode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncChkPlanCode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcchkplancodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});