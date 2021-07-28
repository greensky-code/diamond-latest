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

import { FinalNonApSetupService } from './final-non-ap-setup.service';
import { FinalNonApSetup } from '../api-models/final-non-ap-setup.model'
import { FinalNonApSetups } from "../api-models/testing/fake-final-non-ap-setup.model"

describe('FinalNonApSetupService', () => {
  let injector: TestBed;
  let service: FinalNonApSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinalNonApSetupService]
    });
    injector = getTestBed();
    service = injector.get(FinalNonApSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFinalNonApSetups', () => {
    it('should return an Promise<FinalNonApSetup[]>', () => {
      const finalNonApSetup = [
       {thruReceivedDate:'2018-01-01', fromReceivedDate:'2018-01-01', companyCode:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', thruEnteredDate:'2018-01-01', fromEnteredDate:'2018-01-01', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqFinalId:1234},
       {thruReceivedDate:'2018-01-01', fromReceivedDate:'2018-01-01', companyCode:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', thruEnteredDate:'2018-01-01', fromEnteredDate:'2018-01-01', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqFinalId:1234},
       {thruReceivedDate:'2018-01-01', fromReceivedDate:'2018-01-01', companyCode:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', thruEnteredDate:'2018-01-01', fromEnteredDate:'2018-01-01', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqFinalId:1234}

      ];
      service.getFinalNonApSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(finalNonApSetup);
    });
  });


  describe('#createFinalNonApSetup', () => {
    var id = 1;
    it('should return an Promise<FinalNonApSetup>', () => {
      const finalNonApSetup: FinalNonApSetup = {thruReceivedDate:'2018-01-01', fromReceivedDate:'2018-01-01', companyCode:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', thruEnteredDate:'2018-01-01', fromEnteredDate:'2018-01-01', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqFinalId:1234};
      service.createFinalNonApSetup(finalNonApSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFinalNonApSetup', () => {
    var id = 1;
    it('should return an Promise<FinalNonApSetup>', () => {
      const finalNonApSetup: FinalNonApSetup = {thruReceivedDate:'2018-01-01', fromReceivedDate:'2018-01-01', companyCode:'sample data', inProcess:'sample data', template:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', status:'sample data', thruEnteredDate:'2018-01-01', fromEnteredDate:'2018-01-01', requestType:'sample data', requestDate:'2018-01-01', requestUser:'sample data', jobId:'sample data', seqFinalId:1234};
      service.updateFinalNonApSetup(finalNonApSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFinalNonApSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFinalNonApSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});