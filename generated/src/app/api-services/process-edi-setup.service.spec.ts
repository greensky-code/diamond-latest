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

import { ProcessEdiSetupService } from './process-edi-setup.service';
import { ProcessEdiSetup } from '../api-models/process-edi-setup.model'
import { ProcessEdiSetups } from "../api-models/testing/fake-process-edi-setup.model"

describe('ProcessEdiSetupService', () => {
  let injector: TestBed;
  let service: ProcessEdiSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcessEdiSetupService]
    });
    injector = getTestBed();
    service = injector.get(ProcessEdiSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcessEdiSetups', () => {
    it('should return an Promise<ProcessEdiSetup[]>', () => {
      const processEdiSetup = [
       {seqPrediId:1234, transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', status:'sample data', originFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data', numDetailAdds:1234, totalBilledAmount:1234, runOption6:'sample data'},
       {seqPrediId:1234, transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', status:'sample data', originFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data', numDetailAdds:1234, totalBilledAmount:1234, runOption6:'sample data'},
       {seqPrediId:1234, transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', status:'sample data', originFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data', numDetailAdds:1234, totalBilledAmount:1234, runOption6:'sample data'}

      ];
      service.getProcessEdiSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/processedisetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(processEdiSetup);
    });
  });


  describe('#createProcessEdiSetup', () => {
    var id = 1;
    it('should return an Promise<ProcessEdiSetup>', () => {
      const processEdiSetup: ProcessEdiSetup = {seqPrediId:1234, transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', status:'sample data', originFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data', numDetailAdds:1234, totalBilledAmount:1234, runOption6:'sample data'};
      service.createProcessEdiSetup(processEdiSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/processedisetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcessEdiSetup', () => {
    var id = 1;
    it('should return an Promise<ProcessEdiSetup>', () => {
      const processEdiSetup: ProcessEdiSetup = {seqPrediId:1234, transactionSetId:'sample data', submitterId:'sample data', fileType:'sample data', inputFileName:'sample data', status:'sample data', originFlag:'sample data', conversionProgram:'sample data', rcvdDateTime:'2018-01-01', rcvdUserId:'sample data', editDateTime:'2018-01-01', editUserId:'sample data', editStatus:'sample data', postDateTime:'2018-01-01', postUserId:'sample data', postStatus:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', redoConversion:'sample data', defaultEffectiveDate:'2018-01-01', defaultTermDate:'2018-01-01', numInputRecords:1234, numAdds:1234, numTerms:1234, numReinstates:1234, numChanges:1234, daemonRequest:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', template:'sample data', inProcess:'sample data', numDetailAdds:1234, totalBilledAmount:1234, runOption6:'sample data'};
      service.updateProcessEdiSetup(processEdiSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/processedisetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcessEdiSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcessEdiSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/processedisetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});