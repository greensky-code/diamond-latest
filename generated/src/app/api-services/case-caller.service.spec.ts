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

import { CaseCallerService } from './case-caller.service';
import { CaseCaller } from '../api-models/case-caller.model'
import { CaseCallers } from "../api-models/testing/fake-case-caller.model"

describe('CaseCallerService', () => {
  let injector: TestBed;
  let service: CaseCallerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseCallerService]
    });
    injector = getTestBed();
    service = injector.get(CaseCallerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseCallers', () => {
    it('should return an Promise<CaseCaller[]>', () => {
      const caseCaller = [
       {seqCallerId:1234, seqCaseId:1234, callerIsCustomerFlag:'sample data', callerTypeCsCode:'sample data', callerMasterId:'sample data', callerMasterNumber:'sample data', callerMasterSubNumber:'sample data', contactMethodCsCode:'sample data', relationCsCode:'sample data', name:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phone1:'sample data', phone1DesignCsCode:'sample data', phone2:'sample data', phone2DesignCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country:'sample data'},
       {seqCallerId:1234, seqCaseId:1234, callerIsCustomerFlag:'sample data', callerTypeCsCode:'sample data', callerMasterId:'sample data', callerMasterNumber:'sample data', callerMasterSubNumber:'sample data', contactMethodCsCode:'sample data', relationCsCode:'sample data', name:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phone1:'sample data', phone1DesignCsCode:'sample data', phone2:'sample data', phone2DesignCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country:'sample data'},
       {seqCallerId:1234, seqCaseId:1234, callerIsCustomerFlag:'sample data', callerTypeCsCode:'sample data', callerMasterId:'sample data', callerMasterNumber:'sample data', callerMasterSubNumber:'sample data', contactMethodCsCode:'sample data', relationCsCode:'sample data', name:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phone1:'sample data', phone1DesignCsCode:'sample data', phone2:'sample data', phone2DesignCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country:'sample data'}

      ];
      service.getCaseCallers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/casecallers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseCaller);
    });
  });


  describe('#createCaseCaller', () => {
    var id = 1;
    it('should return an Promise<CaseCaller>', () => {
      const caseCaller: CaseCaller = {seqCallerId:1234, seqCaseId:1234, callerIsCustomerFlag:'sample data', callerTypeCsCode:'sample data', callerMasterId:'sample data', callerMasterNumber:'sample data', callerMasterSubNumber:'sample data', contactMethodCsCode:'sample data', relationCsCode:'sample data', name:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phone1:'sample data', phone1DesignCsCode:'sample data', phone2:'sample data', phone2DesignCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country:'sample data'};
      service.createCaseCaller(caseCaller).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casecallers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseCaller', () => {
    var id = 1;
    it('should return an Promise<CaseCaller>', () => {
      const caseCaller: CaseCaller = {seqCallerId:1234, seqCaseId:1234, callerIsCustomerFlag:'sample data', callerTypeCsCode:'sample data', callerMasterId:'sample data', callerMasterNumber:'sample data', callerMasterSubNumber:'sample data', contactMethodCsCode:'sample data', relationCsCode:'sample data', name:'sample data', addr1:'sample data', addr2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phone1:'sample data', phone1DesignCsCode:'sample data', phone2:'sample data', phone2DesignCsCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country:'sample data'};
      service.updateCaseCaller(caseCaller, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casecallers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseCaller', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseCaller(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/casecallers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});