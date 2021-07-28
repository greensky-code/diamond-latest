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

import { GetAccmRemainService } from './get-accm-remain.service';
import { GetAccmRemain } from '../api-models/get-accm-remain.model'
import { GetAccmRemains } from "../api-models/testing/fake-get-accm-remain.model"

describe('GetAccmRemainService', () => {
  let injector: TestBed;
  let service: GetAccmRemainService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetAccmRemainService]
    });
    injector = getTestBed();
    service = injector.get(GetAccmRemainService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetAccmRemains', () => {
    it('should return an Promise<GetAccmRemain[]>', () => {
      const getAccmRemain = [
       {pApplyAmt:1234, pAccumAmt:1234},
       {pApplyAmt:1234, pAccumAmt:1234},
       {pApplyAmt:1234, pAccumAmt:1234}

      ];
      service.getGetAccmRemains().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getaccmremains/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getAccmRemain);
    });
  });


  describe('#createGetAccmRemain', () => {
    var id = 1;
    it('should return an Promise<GetAccmRemain>', () => {
      const getAccmRemain: GetAccmRemain = {pApplyAmt:1234, pAccumAmt:1234};
      service.createGetAccmRemain(getAccmRemain).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getaccmremains`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetAccmRemain', () => {
    var id = 1;
    it('should return an Promise<GetAccmRemain>', () => {
      const getAccmRemain: GetAccmRemain = {pApplyAmt:1234, pAccumAmt:1234};
      service.updateGetAccmRemain(getAccmRemain, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getaccmremains/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetAccmRemain', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetAccmRemain(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getaccmremains/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});