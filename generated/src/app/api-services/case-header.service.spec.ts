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

import { CaseHeaderService } from './case-header.service';
import { CaseHeader } from '../api-models/case-header.model'
import { CaseHeaders } from "../api-models/testing/fake-case-header.model"

describe('CaseHeaderService', () => {
  let injector: TestBed;
  let service: CaseHeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseHeaderService]
    });
    injector = getTestBed();
    service = injector.get(CaseHeaderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCaseHeaders', () => {
    it('should return an Promise<CaseHeader[]>', () => {
      const caseHeader = [
       {seqCaseId:1234, caseNumber:'sample data', assignedRep:'sample data', customerTypeCsCode:'sample data', customerMasterId:'sample data', customerMasterNumber:'sample data', customerMasterSubNumber:'sample data', customerName:'sample data', customerAddr1:'sample data', customerAddr2:'sample data', customerCity:'sample data', customerState:'sample data', customerZipCode:'sample data', customerPhone1:'sample data', phone1DesignCsCode:'sample data', customerPhone2:'sample data', phone2DesignCsCode:'sample data', statusDate:'2018-01-01', statusCsCode:'sample data', comments:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseCompleteFlag:'sample data', customerCountry:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', memberUserDefined2:'sample data'},
       {seqCaseId:1234, caseNumber:'sample data', assignedRep:'sample data', customerTypeCsCode:'sample data', customerMasterId:'sample data', customerMasterNumber:'sample data', customerMasterSubNumber:'sample data', customerName:'sample data', customerAddr1:'sample data', customerAddr2:'sample data', customerCity:'sample data', customerState:'sample data', customerZipCode:'sample data', customerPhone1:'sample data', phone1DesignCsCode:'sample data', customerPhone2:'sample data', phone2DesignCsCode:'sample data', statusDate:'2018-01-01', statusCsCode:'sample data', comments:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseCompleteFlag:'sample data', customerCountry:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', memberUserDefined2:'sample data'},
       {seqCaseId:1234, caseNumber:'sample data', assignedRep:'sample data', customerTypeCsCode:'sample data', customerMasterId:'sample data', customerMasterNumber:'sample data', customerMasterSubNumber:'sample data', customerName:'sample data', customerAddr1:'sample data', customerAddr2:'sample data', customerCity:'sample data', customerState:'sample data', customerZipCode:'sample data', customerPhone1:'sample data', phone1DesignCsCode:'sample data', customerPhone2:'sample data', phone2DesignCsCode:'sample data', statusDate:'2018-01-01', statusCsCode:'sample data', comments:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseCompleteFlag:'sample data', customerCountry:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', memberUserDefined2:'sample data'}

      ];
      service.getCaseHeaders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/caseheaders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(caseHeader);
    });
  });


  describe('#createCaseHeader', () => {
    var id = 1;
    it('should return an Promise<CaseHeader>', () => {
      const caseHeader: CaseHeader = {seqCaseId:1234, caseNumber:'sample data', assignedRep:'sample data', customerTypeCsCode:'sample data', customerMasterId:'sample data', customerMasterNumber:'sample data', customerMasterSubNumber:'sample data', customerName:'sample data', customerAddr1:'sample data', customerAddr2:'sample data', customerCity:'sample data', customerState:'sample data', customerZipCode:'sample data', customerPhone1:'sample data', phone1DesignCsCode:'sample data', customerPhone2:'sample data', phone2DesignCsCode:'sample data', statusDate:'2018-01-01', statusCsCode:'sample data', comments:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseCompleteFlag:'sample data', customerCountry:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', memberUserDefined2:'sample data'};
      service.createCaseHeader(caseHeader).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caseheaders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCaseHeader', () => {
    var id = 1;
    it('should return an Promise<CaseHeader>', () => {
      const caseHeader: CaseHeader = {seqCaseId:1234, caseNumber:'sample data', assignedRep:'sample data', customerTypeCsCode:'sample data', customerMasterId:'sample data', customerMasterNumber:'sample data', customerMasterSubNumber:'sample data', customerName:'sample data', customerAddr1:'sample data', customerAddr2:'sample data', customerCity:'sample data', customerState:'sample data', customerZipCode:'sample data', customerPhone1:'sample data', phone1DesignCsCode:'sample data', customerPhone2:'sample data', phone2DesignCsCode:'sample data', statusDate:'2018-01-01', statusCsCode:'sample data', comments:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefinedDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseCompleteFlag:'sample data', customerCountry:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', memberUserDefined2:'sample data'};
      service.updateCaseHeader(caseHeader, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caseheaders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCaseHeader', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCaseHeader(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caseheaders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});