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

import { MatrixDetermYService } from './matrix-determ-y.service';
import { MatrixDetermY } from '../api-models/matrix-determ-y.model'
import { MatrixDetermYs } from "../api-models/testing/fake-matrix-determ-y.model"

describe('MatrixDetermYService', () => {
  let injector: TestBed;
  let service: MatrixDetermYService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatrixDetermYService]
    });
    injector = getTestBed();
    service = injector.get(MatrixDetermYService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMatrixDetermYs', () => {
    it('should return an Promise<MatrixDetermY[]>', () => {
      const matrixDetermY = [
       {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', familySizeFrom:1234, familySizeThru:1234, ageFrom:1234, ageThru:1234, gender:'sample data', spouseFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', familySizeFrom:1234, familySizeThru:1234, ageFrom:1234, ageThru:1234, gender:'sample data', spouseFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', familySizeFrom:1234, familySizeThru:1234, ageFrom:1234, ageThru:1234, gender:'sample data', spouseFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getMatrixDetermYs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(matrixDetermY);
    });
  });


  describe('#createMatrixDetermY', () => {
    var id = 1;
    it('should return an Promise<MatrixDetermY>', () => {
      const matrixDetermY: MatrixDetermY = {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', familySizeFrom:1234, familySizeThru:1234, ageFrom:1234, ageThru:1234, gender:'sample data', spouseFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createMatrixDetermY(matrixDetermY).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMatrixDetermY', () => {
    var id = 1;
    it('should return an Promise<MatrixDetermY>', () => {
      const matrixDetermY: MatrixDetermY = {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', familySizeFrom:1234, familySizeThru:1234, ageFrom:1234, ageThru:1234, gender:'sample data', spouseFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateMatrixDetermY(matrixDetermY, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMatrixDetermY', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMatrixDetermY(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/matrixdetermys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});