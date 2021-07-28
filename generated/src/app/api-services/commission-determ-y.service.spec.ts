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

import { CommissionDetermYService } from './commission-determ-y.service';
import { CommissionDetermY } from '../api-models/commission-determ-y.model'
import { CommissionDetermYs } from "../api-models/testing/fake-commission-determ-y.model"

describe('CommissionDetermYService', () => {
  let injector: TestBed;
  let service: CommissionDetermYService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommissionDetermYService]
    });
    injector = getTestBed();
    service = injector.get(CommissionDetermYService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCommissionDetermYs', () => {
    it('should return an Promise<CommissionDetermY[]>', () => {
      const commissionDetermY = [
       {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', premiumPaidYtdFrom:1234, premiumPaidYtdThru:1234, premiumBilledYtdFrom:1234, premiumBilledYtdThru:1234, state:'sample data', lineOfBusiness:'sample data', yearsContractedFrom:1234, yearsContractedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', premiumPaidYtdFrom:1234, premiumPaidYtdThru:1234, premiumBilledYtdFrom:1234, premiumBilledYtdThru:1234, state:'sample data', lineOfBusiness:'sample data', yearsContractedFrom:1234, yearsContractedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', premiumPaidYtdFrom:1234, premiumPaidYtdThru:1234, premiumBilledYtdFrom:1234, premiumBilledYtdThru:1234, state:'sample data', lineOfBusiness:'sample data', yearsContractedFrom:1234, yearsContractedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCommissionDetermYs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(commissionDetermY);
    });
  });


  describe('#createCommissionDetermY', () => {
    var id = 1;
    it('should return an Promise<CommissionDetermY>', () => {
      const commissionDetermY: CommissionDetermY = {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', premiumPaidYtdFrom:1234, premiumPaidYtdThru:1234, premiumBilledYtdFrom:1234, premiumBilledYtdThru:1234, state:'sample data', lineOfBusiness:'sample data', yearsContractedFrom:1234, yearsContractedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCommissionDetermY(commissionDetermY).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCommissionDetermY', () => {
    var id = 1;
    it('should return an Promise<CommissionDetermY>', () => {
      const commissionDetermY: CommissionDetermY = {matrixDeterminant:'sample data', matrixSeq:1234, yAxisDescription:'sample data', premiumPaidYtdFrom:1234, premiumPaidYtdThru:1234, premiumBilledYtdFrom:1234, premiumBilledYtdThru:1234, state:'sample data', lineOfBusiness:'sample data', yearsContractedFrom:1234, yearsContractedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCommissionDetermY(commissionDetermY, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCommissionDetermY', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCommissionDetermY(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});