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

import { ArCashBatchControlService } from './ar-cash-batch-control.service';
import { ArCashBatchControl } from '../api-models/ar-cash-batch-control.model'
import { ArCashBatchControls } from "../api-models/testing/fake-ar-cash-batch-control.model"

describe('ArCashBatchControlService', () => {
  let injector: TestBed;
  let service: ArCashBatchControlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArCashBatchControlService]
    });
    injector = getTestBed();
    service = injector.get(ArCashBatchControlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getArCashBatchControls', () => {
    it('should return an Promise<ArCashBatchControl[]>', () => {
      const arCashBatchControl = [
       {seqCashBatchId:1234, itemCount:1234, batchTotal:1234, batchStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCashBatchId:1234, itemCount:1234, batchTotal:1234, batchStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCashBatchId:1234, itemCount:1234, batchTotal:1234, batchStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getArCashBatchControls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/arcashbatchcontrols/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(arCashBatchControl);
    });
  });


  describe('#createArCashBatchControl', () => {
    var id = 1;
    it('should return an Promise<ArCashBatchControl>', () => {
      const arCashBatchControl: ArCashBatchControl = {seqCashBatchId:1234, itemCount:1234, batchTotal:1234, batchStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createArCashBatchControl(arCashBatchControl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashbatchcontrols`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateArCashBatchControl', () => {
    var id = 1;
    it('should return an Promise<ArCashBatchControl>', () => {
      const arCashBatchControl: ArCashBatchControl = {seqCashBatchId:1234, itemCount:1234, batchTotal:1234, batchStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateArCashBatchControl(arCashBatchControl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashbatchcontrols/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteArCashBatchControl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteArCashBatchControl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/arcashbatchcontrols/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});