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

import { ReasonCodeMasterService } from './reason-code-master.service';
import { ReasonCodeMaster } from '../api-models/reason-code-master.model'
import { ReasonCodeMasters } from "../api-models/testing/fake-reason-code-master.model"

describe('ReasonCodeMasterService', () => {
  let injector: TestBed;
  let service: ReasonCodeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReasonCodeMasterService]
    });
    injector = getTestBed();
    service = injector.get(ReasonCodeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getReasonCodeMasters', () => {
    it('should return an Promise<ReasonCodeMaster[]>', () => {
      const reasonCodeMaster = [
       {rncCode:'sample data', descInd:'sample data', eobCalcOption:'sample data', calcDescription:'sample data', description2:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', uncleanFlag:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', autoAuditLocCod:'sample data', description:'sample data', reasonCodeType:'sample data', reasonCode:'sample data'},
       {rncCode:'sample data', descInd:'sample data', eobCalcOption:'sample data', calcDescription:'sample data', description2:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', uncleanFlag:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', autoAuditLocCod:'sample data', description:'sample data', reasonCodeType:'sample data', reasonCode:'sample data'},
       {rncCode:'sample data', descInd:'sample data', eobCalcOption:'sample data', calcDescription:'sample data', description2:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', uncleanFlag:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', autoAuditLocCod:'sample data', description:'sample data', reasonCodeType:'sample data', reasonCode:'sample data'}

      ];
      service.getReasonCodeMasters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reasoncodemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(reasonCodeMaster);
    });
  });


  describe('#createReasonCodeMaster', () => {
    var id = 1;
    it('should return an Promise<ReasonCodeMaster>', () => {
      const reasonCodeMaster: ReasonCodeMaster = {rncCode:'sample data', descInd:'sample data', eobCalcOption:'sample data', calcDescription:'sample data', description2:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', uncleanFlag:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', autoAuditLocCod:'sample data', description:'sample data', reasonCodeType:'sample data', reasonCode:'sample data'};
      service.createReasonCodeMaster(reasonCodeMaster).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reasoncodemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateReasonCodeMaster', () => {
    var id = 1;
    it('should return an Promise<ReasonCodeMaster>', () => {
      const reasonCodeMaster: ReasonCodeMaster = {rncCode:'sample data', descInd:'sample data', eobCalcOption:'sample data', calcDescription:'sample data', description2:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', uncleanFlag:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', autoAuditLocCod:'sample data', description:'sample data', reasonCodeType:'sample data', reasonCode:'sample data'};
      service.updateReasonCodeMaster(reasonCodeMaster, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reasoncodemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteReasonCodeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteReasonCodeMaster(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reasoncodemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});