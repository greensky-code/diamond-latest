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

import { ToothHistoryService } from './tooth-history.service';
import { ToothHistory } from '../api-models/tooth-history.model'
import { ToothHistorys } from "../api-models/testing/fake-tooth-history.model"

describe('ToothHistoryService', () => {
  let injector: TestBed;
  let service: ToothHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToothHistoryService]
    });
    injector = getTestBed();
    service = injector.get(ToothHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getToothHistorys', () => {
    it('should return an Promise<ToothHistory[]>', () => {
      const toothHistory = [
       {seqToothHistoryId:1234, seqMembId:1234, dateOfService:'2018-01-01', toothNumber:'sample data', procedureCode:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', toothStatus:'sample data', seqProvId:1234, benefitPackageId:'sample data', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', sourceType:'sample data', userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medDefCode:'sample data'},
       {seqToothHistoryId:1234, seqMembId:1234, dateOfService:'2018-01-01', toothNumber:'sample data', procedureCode:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', toothStatus:'sample data', seqProvId:1234, benefitPackageId:'sample data', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', sourceType:'sample data', userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medDefCode:'sample data'},
       {seqToothHistoryId:1234, seqMembId:1234, dateOfService:'2018-01-01', toothNumber:'sample data', procedureCode:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', toothStatus:'sample data', seqProvId:1234, benefitPackageId:'sample data', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', sourceType:'sample data', userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medDefCode:'sample data'}

      ];
      service.getToothHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/toothhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(toothHistory);
    });
  });


  describe('#createToothHistory', () => {
    var id = 1;
    it('should return an Promise<ToothHistory>', () => {
      const toothHistory: ToothHistory = {seqToothHistoryId:1234, seqMembId:1234, dateOfService:'2018-01-01', toothNumber:'sample data', procedureCode:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', toothStatus:'sample data', seqProvId:1234, benefitPackageId:'sample data', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', sourceType:'sample data', userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medDefCode:'sample data'};
      service.createToothHistory(toothHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateToothHistory', () => {
    var id = 1;
    it('should return an Promise<ToothHistory>', () => {
      const toothHistory: ToothHistory = {seqToothHistoryId:1234, seqMembId:1234, dateOfService:'2018-01-01', toothNumber:'sample data', procedureCode:'sample data', surface1:'sample data', surface2:'sample data', surface3:'sample data', surface4:'sample data', surface5:'sample data', arch:'sample data', quadrant:'sample data', oralCavity:'sample data', toothStatus:'sample data', seqProvId:1234, benefitPackageId:'sample data', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', sourceType:'sample data', userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medDefCode:'sample data'};
      service.updateToothHistory(toothHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteToothHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteToothHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});