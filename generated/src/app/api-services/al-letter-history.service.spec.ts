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

import { AlLetterHistoryService } from './al-letter-history.service';
import { AlLetterHistory } from '../api-models/al-letter-history.model'
import { AlLetterHistorys } from "../api-models/testing/fake-al-letter-history.model"

describe('AlLetterHistoryService', () => {
  let injector: TestBed;
  let service: AlLetterHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLetterHistoryService]
    });
    injector = getTestBed();
    service = injector.get(AlLetterHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLetterHistorys', () => {
    it('should return an Promise<AlLetterHistory[]>', () => {
      const alLetterHistory = [
       {seqLetterHist:1234, letterEventId:'sample data', letterTemplateId:'sample data', seqLetterTempId:1234, groupTemplateId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterHist:1234, letterEventId:'sample data', letterTemplateId:'sample data', seqLetterTempId:1234, groupTemplateId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterHist:1234, letterEventId:'sample data', letterTemplateId:'sample data', seqLetterTempId:1234, groupTemplateId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAlLetterHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/alletterhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLetterHistory);
    });
  });


  describe('#createAlLetterHistory', () => {
    var id = 1;
    it('should return an Promise<AlLetterHistory>', () => {
      const alLetterHistory: AlLetterHistory = {seqLetterHist:1234, letterEventId:'sample data', letterTemplateId:'sample data', seqLetterTempId:1234, groupTemplateId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAlLetterHistory(alLetterHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alletterhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLetterHistory', () => {
    var id = 1;
    it('should return an Promise<AlLetterHistory>', () => {
      const alLetterHistory: AlLetterHistory = {seqLetterHist:1234, letterEventId:'sample data', letterTemplateId:'sample data', seqLetterTempId:1234, groupTemplateId:'sample data', key1:'sample data', key2:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAlLetterHistory(alLetterHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alletterhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLetterHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLetterHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/alletterhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});