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

import { LetterHistoryFieldService } from './letter-history-field.service';
import { LetterHistoryField } from '../api-models/letter-history-field.model'
import { LetterHistoryFields } from "../api-models/testing/fake-letter-history-field.model"

describe('LetterHistoryFieldService', () => {
  let injector: TestBed;
  let service: LetterHistoryFieldService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LetterHistoryFieldService]
    });
    injector = getTestBed();
    service = injector.get(LetterHistoryFieldService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLetterHistoryFields', () => {
    it('should return an Promise<LetterHistoryField[]>', () => {
      const letterHistoryField = [
       {seqLetterHist:1234, mergeField:'sample data', dataValue:'sample data'},
       {seqLetterHist:1234, mergeField:'sample data', dataValue:'sample data'},
       {seqLetterHist:1234, mergeField:'sample data', dataValue:'sample data'}

      ];
      service.getLetterHistoryFields().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistoryfields/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(letterHistoryField);
    });
  });


  describe('#createLetterHistoryField', () => {
    var id = 1;
    it('should return an Promise<LetterHistoryField>', () => {
      const letterHistoryField: LetterHistoryField = {seqLetterHist:1234, mergeField:'sample data', dataValue:'sample data'};
      service.createLetterHistoryField(letterHistoryField).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistoryfields`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLetterHistoryField', () => {
    var id = 1;
    it('should return an Promise<LetterHistoryField>', () => {
      const letterHistoryField: LetterHistoryField = {seqLetterHist:1234, mergeField:'sample data', dataValue:'sample data'};
      service.updateLetterHistoryField(letterHistoryField, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistoryfields/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLetterHistoryField', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLetterHistoryField(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/letterhistoryfields/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});