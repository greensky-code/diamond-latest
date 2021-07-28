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

import { ProcCalcAccumPeriodService } from './proc-calc-accum-period.service';
import { ProcCalcAccumPeriod } from '../api-models/proc-calc-accum-period.model'
import { ProcCalcAccumPeriods } from "../api-models/testing/fake-proc-calc-accum-period.model"

describe('ProcCalcAccumPeriodService', () => {
  let injector: TestBed;
  let service: ProcCalcAccumPeriodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCalcAccumPeriodService]
    });
    injector = getTestBed();
    service = injector.get(ProcCalcAccumPeriodService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCalcAccumPeriods', () => {
    it('should return an Promise<ProcCalcAccumPeriod[]>', () => {
      const procCalcAccumPeriod = [
       {inRule:'sample data', inStDate:'sample data', inEndDate:'sample data', outStDate:'sample data', inAsOfDate:'sample data'},
       {inRule:'sample data', inStDate:'sample data', inEndDate:'sample data', outStDate:'sample data', inAsOfDate:'sample data'},
       {inRule:'sample data', inStDate:'sample data', inEndDate:'sample data', outStDate:'sample data', inAsOfDate:'sample data'}

      ];
      service.getProcCalcAccumPeriods().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proccalcaccumperiods/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCalcAccumPeriod);
    });
  });


  describe('#createProcCalcAccumPeriod', () => {
    var id = 1;
    it('should return an Promise<ProcCalcAccumPeriod>', () => {
      const procCalcAccumPeriod: ProcCalcAccumPeriod = {inRule:'sample data', inStDate:'sample data', inEndDate:'sample data', outStDate:'sample data', inAsOfDate:'sample data'};
      service.createProcCalcAccumPeriod(procCalcAccumPeriod).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccalcaccumperiods`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCalcAccumPeriod', () => {
    var id = 1;
    it('should return an Promise<ProcCalcAccumPeriod>', () => {
      const procCalcAccumPeriod: ProcCalcAccumPeriod = {inRule:'sample data', inStDate:'sample data', inEndDate:'sample data', outStDate:'sample data', inAsOfDate:'sample data'};
      service.updateProcCalcAccumPeriod(procCalcAccumPeriod, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccalcaccumperiods/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCalcAccumPeriod', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCalcAccumPeriod(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccalcaccumperiods/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});