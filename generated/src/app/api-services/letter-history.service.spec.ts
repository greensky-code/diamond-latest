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

import { LetterHistoryService } from './letter-history.service';
import { LetterHistory } from '../api-models/letter-history.model'
import { LetterHistorys } from "../api-models/testing/fake-letter-history.model"

describe('LetterHistoryService', () => {
  let injector: TestBed;
  let service: LetterHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LetterHistoryService]
    });
    injector = getTestBed();
    service = injector.get(LetterHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLetterHistorys', () => {
    it('should return an Promise<LetterHistory[]>', () => {
      const letterHistory = [
       {seqLetterHist:1234, letterId:'sample data', letterIdSuffix:'sample data', letterType:'sample data', addresseeType:'sample data', seqMembId:1234, seqGroupId:1234, seqProvId:1234, seqVendId:1234, printStatus:'sample data', printDate:'2018-01-01', printBatch:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', seqLtprtId:1234, addresseeId:'sample data', addresseeName:'sample data', addresseeZipCode:'sample data'},
       {seqLetterHist:1234, letterId:'sample data', letterIdSuffix:'sample data', letterType:'sample data', addresseeType:'sample data', seqMembId:1234, seqGroupId:1234, seqProvId:1234, seqVendId:1234, printStatus:'sample data', printDate:'2018-01-01', printBatch:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', seqLtprtId:1234, addresseeId:'sample data', addresseeName:'sample data', addresseeZipCode:'sample data'},
       {seqLetterHist:1234, letterId:'sample data', letterIdSuffix:'sample data', letterType:'sample data', addresseeType:'sample data', seqMembId:1234, seqGroupId:1234, seqProvId:1234, seqVendId:1234, printStatus:'sample data', printDate:'2018-01-01', printBatch:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', seqLtprtId:1234, addresseeId:'sample data', addresseeName:'sample data', addresseeZipCode:'sample data'}

      ];
      service.getLetterHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(letterHistory);
    });
  });


  describe('#createLetterHistory', () => {
    var id = 1;
    it('should return an Promise<LetterHistory>', () => {
      const letterHistory: LetterHistory = {seqLetterHist:1234, letterId:'sample data', letterIdSuffix:'sample data', letterType:'sample data', addresseeType:'sample data', seqMembId:1234, seqGroupId:1234, seqProvId:1234, seqVendId:1234, printStatus:'sample data', printDate:'2018-01-01', printBatch:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', seqLtprtId:1234, addresseeId:'sample data', addresseeName:'sample data', addresseeZipCode:'sample data'};
      service.createLetterHistory(letterHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLetterHistory', () => {
    var id = 1;
    it('should return an Promise<LetterHistory>', () => {
      const letterHistory: LetterHistory = {seqLetterHist:1234, letterId:'sample data', letterIdSuffix:'sample data', letterType:'sample data', addresseeType:'sample data', seqMembId:1234, seqGroupId:1234, seqProvId:1234, seqVendId:1234, printStatus:'sample data', printDate:'2018-01-01', printBatch:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', seqLtprtId:1234, addresseeId:'sample data', addresseeName:'sample data', addresseeZipCode:'sample data'};
      service.updateLetterHistory(letterHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLetterHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLetterHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});