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

import { MatrixDetermHeaderService } from './matrix-determ-header.service';
import { MatrixDetermHeader } from '../api-models/matrix-determ-header.model'
import { MatrixDetermHeaders } from "../api-models/testing/fake-matrix-determ-header.model"

describe('MatrixDetermHeaderService', () => {
  let injector: TestBed;
  let service: MatrixDetermHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatrixDetermHeaderService]
    });
    injector = getTestBed();
    service = injector.get(MatrixDetermHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMatrixDetermHeaders', () => {
    it('should return an Promise<MatrixDetermHeader[]>', () => {
      const matrixDetermHeader = [
       {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getMatrixDetermHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(matrixDetermHeader);
    });
  });


  describe('#createMatrixDetermHeader', () => {
    var id = 1;
    it('should return an Promise<MatrixDetermHeader>', () => {
      const matrixDetermHeader: MatrixDetermHeader = {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createMatrixDetermHeader(matrixDetermHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMatrixDetermHeader', () => {
    var id = 1;
    it('should return an Promise<MatrixDetermHeader>', () => {
      const matrixDetermHeader: MatrixDetermHeader = {matrixDeterminant:'sample data', matrixDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateMatrixDetermHeader(matrixDetermHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMatrixDetermHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMatrixDetermHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});