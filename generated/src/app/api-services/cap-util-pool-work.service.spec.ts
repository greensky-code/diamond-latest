/* Copyright (c) 2020 . All Rights Reserved. */

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

import { CapUtilPoolWorkService } from './cap-util-pool-work.service';
import { CapUtilPoolWork } from '../api-models/cap-util-pool-work.model'
import { CapUtilPoolWorks } from "../api-models/testing/fake-cap-util-pool-work.model"

describe('CapUtilPoolWorkService', () => {
  let injector: TestBed;
  let service: CapUtilPoolWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapUtilPoolWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapUtilPoolWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapUtilPoolWorks', () => {
    it('should return an Promise<CapUtilPoolWork[]>', () => {
      const capUtilPoolWork = [
       {seqCcalcId:1234, seqCapUtilPoolWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqCapElgcntWork:1234, seqMembId:1234, applicableAmt:1234, applicableAmtUpToDate:'2018-01-01', stoplossAdjDate:'2018-01-01', stoplossThreshold:1234, companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data'},
       {seqCcalcId:1234, seqCapUtilPoolWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqCapElgcntWork:1234, seqMembId:1234, applicableAmt:1234, applicableAmtUpToDate:'2018-01-01', stoplossAdjDate:'2018-01-01', stoplossThreshold:1234, companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data'},
       {seqCcalcId:1234, seqCapUtilPoolWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqCapElgcntWork:1234, seqMembId:1234, applicableAmt:1234, applicableAmtUpToDate:'2018-01-01', stoplossAdjDate:'2018-01-01', stoplossThreshold:1234, companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data'}

      ];
      service.getCapUtilPoolWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/caputilpoolworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capUtilPoolWork);
    });
  });


  describe('#createCapUtilPoolWork', () => {
    var id = 1;
    it('should return an Promise<CapUtilPoolWork>', () => {
      const capUtilPoolWork: CapUtilPoolWork = {seqCcalcId:1234, seqCapUtilPoolWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqCapElgcntWork:1234, seqMembId:1234, applicableAmt:1234, applicableAmtUpToDate:'2018-01-01', stoplossAdjDate:'2018-01-01', stoplossThreshold:1234, companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data'};
      service.createCapUtilPoolWork(capUtilPoolWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caputilpoolworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapUtilPoolWork', () => {
    var id = 1;
    it('should return an Promise<CapUtilPoolWork>', () => {
      const capUtilPoolWork: CapUtilPoolWork = {seqCcalcId:1234, seqCapUtilPoolWork:1234, seqCapPoolId:1234, applyTo:'sample data', capStoplossId:'sample data', seqCapElgcntWork:1234, seqMembId:1234, applicableAmt:1234, applicableAmtUpToDate:'2018-01-01', stoplossAdjDate:'2018-01-01', stoplossThreshold:1234, companyCode:'sample data', glRefCode:'sample data', postingRule:'sample data'};
      service.updateCapUtilPoolWork(capUtilPoolWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caputilpoolworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapUtilPoolWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapUtilPoolWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caputilpoolworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});