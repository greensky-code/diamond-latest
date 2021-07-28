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

import { CapEntityWorkService } from './cap-entity-work.service';
import { CapEntityWork } from '../api-models/cap-entity-work.model'
import { CapEntityWorks } from "../api-models/testing/fake-cap-entity-work.model"

describe('CapEntityWorkService', () => {
  let injector: TestBed;
  let service: CapEntityWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapEntityWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapEntityWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapEntityWorks', () => {
    it('should return an Promise<CapEntityWork[]>', () => {
      const capEntityWork = [
       {seqCcalcId:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqProvId:1234, seqVendId:1234, capEntityCode:'sample data', currentRetro:'sample data', capEntityId:'sample data', seqCapVendAddress:1234, seqProvContract:1234, maxEnrollLmt:1234, excludeIncentive:'sample data', accessProgramEligible:'sample data'},
       {seqCcalcId:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqProvId:1234, seqVendId:1234, capEntityCode:'sample data', currentRetro:'sample data', capEntityId:'sample data', seqCapVendAddress:1234, seqProvContract:1234, maxEnrollLmt:1234, excludeIncentive:'sample data', accessProgramEligible:'sample data'},
       {seqCcalcId:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqProvId:1234, seqVendId:1234, capEntityCode:'sample data', currentRetro:'sample data', capEntityId:'sample data', seqCapVendAddress:1234, seqProvContract:1234, maxEnrollLmt:1234, excludeIncentive:'sample data', accessProgramEligible:'sample data'}

      ];
      service.getCapEntityWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capentityworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capEntityWork);
    });
  });


  describe('#createCapEntityWork', () => {
    var id = 1;
    it('should return an Promise<CapEntityWork>', () => {
      const capEntityWork: CapEntityWork = {seqCcalcId:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqProvId:1234, seqVendId:1234, capEntityCode:'sample data', currentRetro:'sample data', capEntityId:'sample data', seqCapVendAddress:1234, seqProvContract:1234, maxEnrollLmt:1234, excludeIncentive:'sample data', accessProgramEligible:'sample data'};
      service.createCapEntityWork(capEntityWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentityworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapEntityWork', () => {
    var id = 1;
    it('should return an Promise<CapEntityWork>', () => {
      const capEntityWork: CapEntityWork = {seqCcalcId:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqProvId:1234, seqVendId:1234, capEntityCode:'sample data', currentRetro:'sample data', capEntityId:'sample data', seqCapVendAddress:1234, seqProvContract:1234, maxEnrollLmt:1234, excludeIncentive:'sample data', accessProgramEligible:'sample data'};
      service.updateCapEntityWork(capEntityWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentityworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapEntityWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapEntityWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentityworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});