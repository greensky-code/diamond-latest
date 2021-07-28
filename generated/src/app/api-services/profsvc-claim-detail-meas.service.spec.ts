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

import { ProfsvcClaimDetailMeasService } from './profsvc-claim-detail-meas.service';
import { ProfsvcClaimDetailMeas } from '../api-models/profsvc-claim-detail-meas.model'
import { ProfsvcClaimDetailMeass } from "../api-models/testing/fake-profsvc-claim-detail-meas.model"

describe('ProfsvcClaimDetailMeasService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimDetailMeasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimDetailMeasService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimDetailMeasService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimDetailMeass', () => {
    it('should return an Promise<ProfsvcClaimDetailMeas[]>', () => {
      const profsvcClaimDetailMeas = [
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', measLineNumber:1234, orgDosage:'sample data', testResultValue:'sample data', measType:'sample data', measValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', measLineNumber:1234, orgDosage:'sample data', testResultValue:'sample data', measType:'sample data', measValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', measLineNumber:1234, orgDosage:'sample data', testResultValue:'sample data', measType:'sample data', measValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProfsvcClaimDetailMeass().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailmeass/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimDetailMeas);
    });
  });


  describe('#createProfsvcClaimDetailMeas', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimDetailMeas>', () => {
      const profsvcClaimDetailMeas: ProfsvcClaimDetailMeas = {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', measLineNumber:1234, orgDosage:'sample data', testResultValue:'sample data', measType:'sample data', measValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProfsvcClaimDetailMeas(profsvcClaimDetailMeas).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailmeass`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimDetailMeas', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimDetailMeas>', () => {
      const profsvcClaimDetailMeas: ProfsvcClaimDetailMeas = {seqClaimId:1234, claimLineNumber:1234, subLineCode:'sample data', measLineNumber:1234, orgDosage:'sample data', testResultValue:'sample data', measType:'sample data', measValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProfsvcClaimDetailMeas(profsvcClaimDetailMeas, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailmeass/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimDetailMeas', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimDetailMeas(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimdetailmeass/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});