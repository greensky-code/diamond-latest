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

import { ReportDefinitionService } from './report-definition.service';
import { ReportDefinition } from '../api-models/report-definition.model'
import { ReportDefinitions } from "../api-models/testing/fake-report-definition.model"

describe('ReportDefinitionService', () => {
  let injector: TestBed;
  let service: ReportDefinitionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportDefinitionService]
    });
    injector = getTestBed();
    service = injector.get(ReportDefinitionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getReportDefinitions', () => {
    it('should return an Promise<ReportDefinition[]>', () => {
      const reportDefinition = [
       {keywordName:'sample data', reportDesc:'sample data', reportCategory:'sample data', serverClientPrtInd:'sample data', storedProcedureId:'sample data', workfileTableName:'sample data', parentJobIdInd:'sample data', toolUsed:'sample data', filterAllowInd:'sample data', sortAllowInd:'sample data', reprintAllowInd:'sample data', userRestrictInd:'sample data', parameter1:'sample data', parameter2:'sample data', parameter3:'sample data', parameter4:'sample data', parameter5:'sample data', parameter6:'sample data', parameter7:'sample data', parameter8:'sample data', parameter9:'sample data', parameter10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keywordName:'sample data', reportDesc:'sample data', reportCategory:'sample data', serverClientPrtInd:'sample data', storedProcedureId:'sample data', workfileTableName:'sample data', parentJobIdInd:'sample data', toolUsed:'sample data', filterAllowInd:'sample data', sortAllowInd:'sample data', reprintAllowInd:'sample data', userRestrictInd:'sample data', parameter1:'sample data', parameter2:'sample data', parameter3:'sample data', parameter4:'sample data', parameter5:'sample data', parameter6:'sample data', parameter7:'sample data', parameter8:'sample data', parameter9:'sample data', parameter10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keywordName:'sample data', reportDesc:'sample data', reportCategory:'sample data', serverClientPrtInd:'sample data', storedProcedureId:'sample data', workfileTableName:'sample data', parentJobIdInd:'sample data', toolUsed:'sample data', filterAllowInd:'sample data', sortAllowInd:'sample data', reprintAllowInd:'sample data', userRestrictInd:'sample data', parameter1:'sample data', parameter2:'sample data', parameter3:'sample data', parameter4:'sample data', parameter5:'sample data', parameter6:'sample data', parameter7:'sample data', parameter8:'sample data', parameter9:'sample data', parameter10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getReportDefinitions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reportdefinitions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(reportDefinition);
    });
  });


  describe('#createReportDefinition', () => {
    var id = 1;
    it('should return an Promise<ReportDefinition>', () => {
      const reportDefinition: ReportDefinition = {keywordName:'sample data', reportDesc:'sample data', reportCategory:'sample data', serverClientPrtInd:'sample data', storedProcedureId:'sample data', workfileTableName:'sample data', parentJobIdInd:'sample data', toolUsed:'sample data', filterAllowInd:'sample data', sortAllowInd:'sample data', reprintAllowInd:'sample data', userRestrictInd:'sample data', parameter1:'sample data', parameter2:'sample data', parameter3:'sample data', parameter4:'sample data', parameter5:'sample data', parameter6:'sample data', parameter7:'sample data', parameter8:'sample data', parameter9:'sample data', parameter10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createReportDefinition(reportDefinition).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportdefinitions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateReportDefinition', () => {
    var id = 1;
    it('should return an Promise<ReportDefinition>', () => {
      const reportDefinition: ReportDefinition = {keywordName:'sample data', reportDesc:'sample data', reportCategory:'sample data', serverClientPrtInd:'sample data', storedProcedureId:'sample data', workfileTableName:'sample data', parentJobIdInd:'sample data', toolUsed:'sample data', filterAllowInd:'sample data', sortAllowInd:'sample data', reprintAllowInd:'sample data', userRestrictInd:'sample data', parameter1:'sample data', parameter2:'sample data', parameter3:'sample data', parameter4:'sample data', parameter5:'sample data', parameter6:'sample data', parameter7:'sample data', parameter8:'sample data', parameter9:'sample data', parameter10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateReportDefinition(reportDefinition, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportdefinitions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteReportDefinition', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteReportDefinition(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportdefinitions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});