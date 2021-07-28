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

import { IsIcd9PeriodService } from './is-icd9-period.service';
import { IsIcd9Period } from '../api-models/is-icd9-period.model'
import { IsIcd9Periods } from "../api-models/testing/fake-is-icd9-period.model"

describe('IsIcd9PeriodService', () => {
  let injector: TestBed;
  let service: IsIcd9PeriodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IsIcd9PeriodService]
    });
    injector = getTestBed();
    service = injector.get(IsIcd9PeriodService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIsIcd9Periods', () => {
    it('should return an Promise<IsIcd9Period[]>', () => {
      const isIcd9Period = [
       {pServiceDate:'sample data'},
       {pServiceDate:'sample data'},
       {pServiceDate:'sample data'}

      ];
      service.getIsIcd9Periods().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/isicd9periods/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(isIcd9Period);
    });
  });


  describe('#createIsIcd9Period', () => {
    var id = 1;
    it('should return an Promise<IsIcd9Period>', () => {
      const isIcd9Period: IsIcd9Period = {pServiceDate:'sample data'};
      service.createIsIcd9Period(isIcd9Period).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/isicd9periods`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIsIcd9Period', () => {
    var id = 1;
    it('should return an Promise<IsIcd9Period>', () => {
      const isIcd9Period: IsIcd9Period = {pServiceDate:'sample data'};
      service.updateIsIcd9Period(isIcd9Period, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/isicd9periods/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIsIcd9Period', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIsIcd9Period(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/isicd9periods/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});