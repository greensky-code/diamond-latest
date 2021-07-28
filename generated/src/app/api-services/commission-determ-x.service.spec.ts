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

import { CommissionDetermXService } from './commission-determ-x.service';
import { CommissionDetermX } from '../api-models/commission-determ-x.model'
import { CommissionDetermXes } from "../api-models/testing/fake-commission-determ-x.model"

describe('CommissionDetermXService', () => {
  let injector: TestBed;
  let service: CommissionDetermXService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommissionDetermXService]
    });
    injector = getTestBed();
    service = injector.get(CommissionDetermXService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCommissionDetermXes', () => {
    it('should return an Promise<CommissionDetermX[]>', () => {
      const commissionDetermX = [
       {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', livesFrom:1234, livesThru:1234, casesFrom:1234, casesThru:1234, maximumLivesForACase:1234, agentType:'sample data', lineOfBusiness:'sample data', yearsLicensedFrom:1234, yearsLicensedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', livesFrom:1234, livesThru:1234, casesFrom:1234, casesThru:1234, maximumLivesForACase:1234, agentType:'sample data', lineOfBusiness:'sample data', yearsLicensedFrom:1234, yearsLicensedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', livesFrom:1234, livesThru:1234, casesFrom:1234, casesThru:1234, maximumLivesForACase:1234, agentType:'sample data', lineOfBusiness:'sample data', yearsLicensedFrom:1234, yearsLicensedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCommissionDetermXes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermxes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(commissionDetermX);
    });
  });


  describe('#createCommissionDetermX', () => {
    var id = 1;
    it('should return an Promise<CommissionDetermX>', () => {
      const commissionDetermX: CommissionDetermX = {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', livesFrom:1234, livesThru:1234, casesFrom:1234, casesThru:1234, maximumLivesForACase:1234, agentType:'sample data', lineOfBusiness:'sample data', yearsLicensedFrom:1234, yearsLicensedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCommissionDetermX(commissionDetermX).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermxes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCommissionDetermX', () => {
    var id = 1;
    it('should return an Promise<CommissionDetermX>', () => {
      const commissionDetermX: CommissionDetermX = {matrixDeterminant:'sample data', matrixSeq:1234, xAxisDescription:'sample data', livesFrom:1234, livesThru:1234, casesFrom:1234, casesThru:1234, maximumLivesForACase:1234, agentType:'sample data', lineOfBusiness:'sample data', yearsLicensedFrom:1234, yearsLicensedThru:1234, yearsPeriod:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCommissionDetermX(commissionDetermX, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermxes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCommissionDetermX', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCommissionDetermX(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/commissiondetermxes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});