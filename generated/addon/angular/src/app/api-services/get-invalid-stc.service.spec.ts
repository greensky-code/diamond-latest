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

import { GetInvalidStcService } from './get-invalid-stc.service';
import { GetInvalidStc } from '../api-models/get-invalid-stc.model'
import { GetInvalidStcs } from "../api-models/testing/fake-get-invalid-stc.model"

describe('GetInvalidStcService', () => {
  let injector: TestBed;
  let service: GetInvalidStcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetInvalidStcService]
    });
    injector = getTestBed();
    service = injector.get(GetInvalidStcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetInvalidStcs', () => {
    it('should return an Promise<GetInvalidStc[]>', () => {
      const getInvalidStc = [
       {pStcInfoList:'sample data'},
       {pStcInfoList:'sample data'},
       {pStcInfoList:'sample data'}

      ];
      service.getGetInvalidStcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getinvalidstcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getInvalidStc);
    });
  });


  describe('#createGetInvalidStc', () => {
    var id = 1;
    it('should return an Promise<GetInvalidStc>', () => {
      const getInvalidStc: GetInvalidStc = {pStcInfoList:'sample data'};
      service.createGetInvalidStc(getInvalidStc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getinvalidstcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetInvalidStc', () => {
    var id = 1;
    it('should return an Promise<GetInvalidStc>', () => {
      const getInvalidStc: GetInvalidStc = {pStcInfoList:'sample data'};
      service.updateGetInvalidStc(getInvalidStc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getinvalidstcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetInvalidStc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetInvalidStc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getinvalidstcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});