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

import { LetterPrintSetupService } from './letter-print-setup.service';
import { LetterPrintSetup } from '../api-models/letter-print-setup.model'
import { LetterPrintSetups } from "../api-models/testing/fake-letter-print-setup.model"

describe('LetterPrintSetupService', () => {
  let injector: TestBed;
  let service: LetterPrintSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LetterPrintSetupService]
    });
    injector = getTestBed();
    service = injector.get(LetterPrintSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLetterPrintSetups', () => {
    it('should return an Promise<LetterPrintSetup[]>', () => {
      const letterPrintSetup = [
       {seqLtprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', letterType:'sample data', printBatch:'sample data', sortOrder:'sample data', originalPrintDate:'2018-01-01', numCopies:1234, status:'sample data', daemonRequest:'sample data', template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', reprintRequest:'sample data', inProcess:'sample data'},
       {seqLtprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', letterType:'sample data', printBatch:'sample data', sortOrder:'sample data', originalPrintDate:'2018-01-01', numCopies:1234, status:'sample data', daemonRequest:'sample data', template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', reprintRequest:'sample data', inProcess:'sample data'},
       {seqLtprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', letterType:'sample data', printBatch:'sample data', sortOrder:'sample data', originalPrintDate:'2018-01-01', numCopies:1234, status:'sample data', daemonRequest:'sample data', template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', reprintRequest:'sample data', inProcess:'sample data'}

      ];
      service.getLetterPrintSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/letterprintsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(letterPrintSetup);
    });
  });


  describe('#createLetterPrintSetup', () => {
    var id = 1;
    it('should return an Promise<LetterPrintSetup>', () => {
      const letterPrintSetup: LetterPrintSetup = {seqLtprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', letterType:'sample data', printBatch:'sample data', sortOrder:'sample data', originalPrintDate:'2018-01-01', numCopies:1234, status:'sample data', daemonRequest:'sample data', template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', reprintRequest:'sample data', inProcess:'sample data'};
      service.createLetterPrintSetup(letterPrintSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterprintsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLetterPrintSetup', () => {
    var id = 1;
    it('should return an Promise<LetterPrintSetup>', () => {
      const letterPrintSetup: LetterPrintSetup = {seqLtprtId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', letterType:'sample data', printBatch:'sample data', sortOrder:'sample data', originalPrintDate:'2018-01-01', numCopies:1234, status:'sample data', daemonRequest:'sample data', template:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', reprintRequest:'sample data', inProcess:'sample data'};
      service.updateLetterPrintSetup(letterPrintSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterprintsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLetterPrintSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLetterPrintSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterprintsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});