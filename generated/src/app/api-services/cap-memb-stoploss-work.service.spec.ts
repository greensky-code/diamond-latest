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

import { CapMembStoplossWorkService } from './cap-memb-stoploss-work.service';
import { CapMembStoplossWork } from '../api-models/cap-memb-stoploss-work.model'
import { CapMembStoplossWorks } from "../api-models/testing/fake-cap-memb-stoploss-work.model"

describe('CapMembStoplossWorkService', () => {
  let injector: TestBed;
  let service: CapMembStoplossWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapMembStoplossWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapMembStoplossWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapMembStoplossWorks', () => {
    it('should return an Promise<CapMembStoplossWork[]>', () => {
      const capMembStoplossWork = [
       {seqCcalcId:1234, seqCapMembSlWork:1234, seqMembId:1234, capStoplossId:'sample data', utilPeriodAmt:1234, utilYtdAmt:1234},
       {seqCcalcId:1234, seqCapMembSlWork:1234, seqMembId:1234, capStoplossId:'sample data', utilPeriodAmt:1234, utilYtdAmt:1234},
       {seqCcalcId:1234, seqCapMembSlWork:1234, seqMembId:1234, capStoplossId:'sample data', utilPeriodAmt:1234, utilYtdAmt:1234}

      ];
      service.getCapMembStoplossWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplossworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capMembStoplossWork);
    });
  });


  describe('#createCapMembStoplossWork', () => {
    var id = 1;
    it('should return an Promise<CapMembStoplossWork>', () => {
      const capMembStoplossWork: CapMembStoplossWork = {seqCcalcId:1234, seqCapMembSlWork:1234, seqMembId:1234, capStoplossId:'sample data', utilPeriodAmt:1234, utilYtdAmt:1234};
      service.createCapMembStoplossWork(capMembStoplossWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplossworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapMembStoplossWork', () => {
    var id = 1;
    it('should return an Promise<CapMembStoplossWork>', () => {
      const capMembStoplossWork: CapMembStoplossWork = {seqCcalcId:1234, seqCapMembSlWork:1234, seqMembId:1234, capStoplossId:'sample data', utilPeriodAmt:1234, utilYtdAmt:1234};
      service.updateCapMembStoplossWork(capMembStoplossWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplossworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapMembStoplossWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapMembStoplossWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplossworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});