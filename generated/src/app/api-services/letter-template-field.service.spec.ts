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

import { LetterTemplateFieldService } from './letter-template-field.service';
import { LetterTemplateField } from '../api-models/letter-template-field.model'
import { LetterTemplateFields } from "../api-models/testing/fake-letter-template-field.model"

describe('LetterTemplateFieldService', () => {
  let injector: TestBed;
  let service: LetterTemplateFieldService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LetterTemplateFieldService]
    });
    injector = getTestBed();
    service = injector.get(LetterTemplateFieldService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLetterTemplateFields', () => {
    it('should return an Promise<LetterTemplateField[]>', () => {
      const letterTemplateField = [
       {letterId:'sample data', letterIdSuffix:'sample data', mergeField:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {letterId:'sample data', letterIdSuffix:'sample data', mergeField:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {letterId:'sample data', letterIdSuffix:'sample data', mergeField:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getLetterTemplateFields().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplatefields/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(letterTemplateField);
    });
  });


  describe('#createLetterTemplateField', () => {
    var id = 1;
    it('should return an Promise<LetterTemplateField>', () => {
      const letterTemplateField: LetterTemplateField = {letterId:'sample data', letterIdSuffix:'sample data', mergeField:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createLetterTemplateField(letterTemplateField).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplatefields`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLetterTemplateField', () => {
    var id = 1;
    it('should return an Promise<LetterTemplateField>', () => {
      const letterTemplateField: LetterTemplateField = {letterId:'sample data', letterIdSuffix:'sample data', mergeField:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateLetterTemplateField(letterTemplateField, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplatefields/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLetterTemplateField', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLetterTemplateField(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplatefields/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});