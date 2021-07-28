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

import { EdiTransactionLogService } from './edi-transaction-log.service';
import { EdiTransactionLog } from '../api-models/edi-transaction-log.model'
import { EdiTransactionLogs } from "../api-models/testing/fake-edi-transaction-log.model"

describe('EdiTransactionLogService', () => {
  let injector: TestBed;
  let service: EdiTransactionLogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EdiTransactionLogService]
    });
    injector = getTestBed();
    service = injector.get(EdiTransactionLogService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEdiTransactionLogs', () => {
    it('should return an Promise<EdiTransactionLog[]>', () => {
      const ediTransactionLog = [
       {transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', transxStatusFlag:'sample data', transxOriginFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data'},
       {transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', transxStatusFlag:'sample data', transxOriginFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data'},
       {transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', transxStatusFlag:'sample data', transxOriginFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data'}

      ];
      service.getEdiTransactionLogs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/editransactionlogs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ediTransactionLog);
    });
  });


  describe('#createEdiTransactionLog', () => {
    var id = 1;
    it('should return an Promise<EdiTransactionLog>', () => {
      const ediTransactionLog: EdiTransactionLog = {transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', transxStatusFlag:'sample data', transxOriginFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data'};
      service.createEdiTransactionLog(ediTransactionLog).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/editransactionlogs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEdiTransactionLog', () => {
    var id = 1;
    it('should return an Promise<EdiTransactionLog>', () => {
      const ediTransactionLog: EdiTransactionLog = {transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', transxStatusFlag:'sample data', transxOriginFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data'};
      service.updateEdiTransactionLog(ediTransactionLog, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/editransactionlogs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEdiTransactionLog', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEdiTransactionLog(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/editransactionlogs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});