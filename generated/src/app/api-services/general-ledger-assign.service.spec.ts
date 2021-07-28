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

import { GeneralLedgerAssignService } from './general-ledger-assign.service';
import { GeneralLedgerAssign } from '../api-models/general-ledger-assign.model'
import { GeneralLedgerAssigns } from "../api-models/testing/fake-general-ledger-assign.model"

describe('GeneralLedgerAssignService', () => {
  let injector: TestBed;
  let service: GeneralLedgerAssignService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneralLedgerAssignService]
    });
    injector = getTestBed();
    service = injector.get(GeneralLedgerAssignService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGeneralLedgerAssigns', () => {
    it('should return an Promise<GeneralLedgerAssign[]>', () => {
      const generalLedgerAssign = [
       {seqGlAssign:1234, glassKey1:'sample data', glassKey2:'sample data', glassKey3:'sample data', glassKey4:'sample data', glassKey5:'sample data', glassKey6:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGlAssign:1234, glassKey1:'sample data', glassKey2:'sample data', glassKey3:'sample data', glassKey4:'sample data', glassKey5:'sample data', glassKey6:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGlAssign:1234, glassKey1:'sample data', glassKey2:'sample data', glassKey3:'sample data', glassKey4:'sample data', glassKey5:'sample data', glassKey6:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getGeneralLedgerAssigns().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerassigns/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(generalLedgerAssign);
    });
  });


  describe('#createGeneralLedgerAssign', () => {
    var id = 1;
    it('should return an Promise<GeneralLedgerAssign>', () => {
      const generalLedgerAssign: GeneralLedgerAssign = {seqGlAssign:1234, glassKey1:'sample data', glassKey2:'sample data', glassKey3:'sample data', glassKey4:'sample data', glassKey5:'sample data', glassKey6:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createGeneralLedgerAssign(generalLedgerAssign).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerassigns`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGeneralLedgerAssign', () => {
    var id = 1;
    it('should return an Promise<GeneralLedgerAssign>', () => {
      const generalLedgerAssign: GeneralLedgerAssign = {seqGlAssign:1234, glassKey1:'sample data', glassKey2:'sample data', glassKey3:'sample data', glassKey4:'sample data', glassKey5:'sample data', glassKey6:'sample data', companyCode:'sample data', glRefCode:'sample data', description:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateGeneralLedgerAssign(generalLedgerAssign, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerassigns/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGeneralLedgerAssign', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGeneralLedgerAssign(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/generalledgerassigns/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});