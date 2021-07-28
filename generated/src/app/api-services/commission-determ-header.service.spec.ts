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

import { CommissionDetermHeaderService } from './commission-determ-header.service';
import { CommissionDetermHeader } from '../api-models/commission-determ-header.model'
import { CommissionDetermHeaders } from "../api-models/testing/fake-commission-determ-header.model"

describe('CommissionDetermHeaderService', () => {
  let injector: TestBed;
  let service: CommissionDetermHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommissionDetermHeaderService]
    });
    injector = getTestBed();
    service = injector.get(CommissionDetermHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCommissionDetermHeaders', () => {
    it('should return an Promise<CommissionDetermHeader[]>', () => {
      const commissionDetermHeader = [
       {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCommissionDetermHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(commissionDetermHeader);
    });
  });


  describe('#createCommissionDetermHeader', () => {
    var id = 1;
    it('should return an Promise<CommissionDetermHeader>', () => {
      const commissionDetermHeader: CommissionDetermHeader = {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCommissionDetermHeader(commissionDetermHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCommissionDetermHeader', () => {
    var id = 1;
    it('should return an Promise<CommissionDetermHeader>', () => {
      const commissionDetermHeader: CommissionDetermHeader = {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCommissionDetermHeader(commissionDetermHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCommissionDetermHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCommissionDetermHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});