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

import { FinalNonApSetupSelService } from './final-non-ap-setup-sel.service';
import { FinalNonApSetupSel } from '../api-models/final-non-ap-setup-sel.model'
import { FinalNonApSetupSels } from "../api-models/testing/fake-final-non-ap-setup-sel.model"

describe('FinalNonApSetupSelService', () => {
  let injector: TestBed;
  let service: FinalNonApSetupSelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinalNonApSetupSelService]
    });
    injector = getTestBed();
    service = injector.get(FinalNonApSetupSelService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFinalNonApSetupSels', () => {
    it('should return an Promise<FinalNonApSetupSel[]>', () => {
      const finalNonApSetupSel = [
       {seqFinalId:1234, seqFinalIdSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {seqFinalId:1234, seqFinalIdSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'},
       {seqFinalId:1234, seqFinalIdSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'}

      ];
      service.getFinalNonApSetupSels().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetupsels/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(finalNonApSetupSel);
    });
  });


  describe('#createFinalNonApSetupSel', () => {
    var id = 1;
    it('should return an Promise<FinalNonApSetupSel>', () => {
      const finalNonApSetupSel: FinalNonApSetupSel = {seqFinalId:1234, seqFinalIdSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.createFinalNonApSetupSel(finalNonApSetupSel).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetupsels`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFinalNonApSetupSel', () => {
    var id = 1;
    it('should return an Promise<FinalNonApSetupSel>', () => {
      const finalNonApSetupSel: FinalNonApSetupSel = {seqFinalId:1234, seqFinalIdSel:1234, columnName:'sample data', columnOccurrence:1234, operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', columnType:'sample data'};
      service.updateFinalNonApSetupSel(finalNonApSetupSel, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetupsels/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFinalNonApSetupSel', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFinalNonApSetupSel(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonapsetupsels/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});