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

import { GetEffTermDtService } from './get-eff-term-dt.service';
import { GetEffTermDt } from '../api-models/get-eff-term-dt.model'
import { GetEffTermDts } from "../api-models/testing/fake-get-eff-term-dt.model"

describe('GetEffTermDtService', () => {
  let injector: TestBed;
  let service: GetEffTermDtService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetEffTermDtService]
    });
    injector = getTestBed();
    service = injector.get(GetEffTermDtService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetEffTermDts', () => {
    it('should return an Promise<GetEffTermDt[]>', () => {
      const getEffTermDt = [
       {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data', oEffectDt:'sample data', oTermDt:'sample data'},
       {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data', oEffectDt:'sample data', oTermDt:'sample data'},
       {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data', oEffectDt:'sample data', oTermDt:'sample data'}

      ];
      service.getGetEffTermDts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getefftermdts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getEffTermDt);
    });
  });


  describe('#createGetEffTermDt', () => {
    var id = 1;
    it('should return an Promise<GetEffTermDt>', () => {
      const getEffTermDt: GetEffTermDt = {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data', oEffectDt:'sample data', oTermDt:'sample data'};
      service.createGetEffTermDt(getEffTermDt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getefftermdts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetEffTermDt', () => {
    var id = 1;
    it('should return an Promise<GetEffTermDt>', () => {
      const getEffTermDt: GetEffTermDt = {pSeqMembId:1234, pRiderCode:'sample data', pSvcStartDt:'sample data', oEffectDt:'sample data', oTermDt:'sample data'};
      service.updateGetEffTermDt(getEffTermDt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getefftermdts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetEffTermDt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetEffTermDt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getefftermdts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});