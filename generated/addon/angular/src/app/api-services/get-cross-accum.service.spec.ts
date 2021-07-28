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

import { GetCrossAccumService } from './get-cross-accum.service';
import { GetCrossAccum } from '../api-models/get-cross-accum.model'
import { GetCrossAccums } from "../api-models/testing/fake-get-cross-accum.model"

describe('GetCrossAccumService', () => {
  let injector: TestBed;
  let service: GetCrossAccumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetCrossAccumService]
    });
    injector = getTestBed();
    service = injector.get(GetCrossAccumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetCrossAccums', () => {
    it('should return an Promise<GetCrossAccum[]>', () => {
      const getCrossAccum = [
       {pRuleId:'sample data', pAttrChar13:'sample data'},
       {pRuleId:'sample data', pAttrChar13:'sample data'},
       {pRuleId:'sample data', pAttrChar13:'sample data'}

      ];
      service.getGetCrossAccums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getcrossaccums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getCrossAccum);
    });
  });


  describe('#createGetCrossAccum', () => {
    var id = 1;
    it('should return an Promise<GetCrossAccum>', () => {
      const getCrossAccum: GetCrossAccum = {pRuleId:'sample data', pAttrChar13:'sample data'};
      service.createGetCrossAccum(getCrossAccum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcrossaccums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetCrossAccum', () => {
    var id = 1;
    it('should return an Promise<GetCrossAccum>', () => {
      const getCrossAccum: GetCrossAccum = {pRuleId:'sample data', pAttrChar13:'sample data'};
      service.updateGetCrossAccum(getCrossAccum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcrossaccums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetCrossAccum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetCrossAccum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcrossaccums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});