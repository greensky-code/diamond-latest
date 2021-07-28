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

import { MatrixDetermXService } from './matrix-determ-x.service';
import { MatrixDetermX } from '../api-models/matrix-determ-x.model'
import { MatrixDetermXes } from "../api-models/testing/fake-matrix-determ-x.model"

describe('MatrixDetermXService', () => {
  let injector: TestBed;
  let service: MatrixDetermXService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatrixDetermXService]
    });
    injector = getTestBed();
    service = injector.get(MatrixDetermXService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMatrixDetermXes', () => {
    it('should return an Promise<MatrixDetermX[]>', () => {
      const matrixDetermX = [
       {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', salaryFrom:1234, salaryThru:1234, medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', salaryFrom:1234, salaryThru:1234, medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', salaryFrom:1234, salaryThru:1234, medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data'}

      ];
      service.getMatrixDetermXes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermxes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(matrixDetermX);
    });
  });


  describe('#createMatrixDetermX', () => {
    var id = 1;
    it('should return an Promise<MatrixDetermX>', () => {
      const matrixDetermX: MatrixDetermX = {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', salaryFrom:1234, salaryThru:1234, medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data'};
      service.createMatrixDetermX(matrixDetermX).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermxes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMatrixDetermX', () => {
    var id = 1;
    it('should return an Promise<MatrixDetermX>', () => {
      const matrixDetermX: MatrixDetermX = {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', ageFrom:1234, ageThru:1234, gender:'sample data', salaryFrom:1234, salaryThru:1234, medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data'};
      service.updateMatrixDetermX(matrixDetermX, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermxes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMatrixDetermX', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMatrixDetermX(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermxes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});