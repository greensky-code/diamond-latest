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

import { LetterTemplateService } from './letter-template.service';
import { LetterTemplate } from '../api-models/letter-template.model'
import { LetterTemplates } from "../api-models/testing/fake-letter-template.model"

describe('LetterTemplateService', () => {
  let injector: TestBed;
  let service: LetterTemplateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LetterTemplateService]
    });
    injector = getTestBed();
    service = injector.get(LetterTemplateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLetterTemplates', () => {
    it('should return an Promise<LetterTemplate[]>', () => {
      const letterTemplate = [
       {letterId:'sample data', letterIdSuffix:'sample data', description:'sample data', letterType:'sample data', letterReasonCode:'sample data', printBatch:'sample data', addresseeType:'sample data', promptCode1Name:'sample data', promptCode2Name:'sample data', promptCode3Name:'sample data', promptCode4Name:'sample data', promptCode5Name:'sample data', promptCode6Name:'sample data', promptDate1Name:'sample data', promptDate2Name:'sample data', promptText1Name:'sample data', promptText2Name:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {letterId:'sample data', letterIdSuffix:'sample data', description:'sample data', letterType:'sample data', letterReasonCode:'sample data', printBatch:'sample data', addresseeType:'sample data', promptCode1Name:'sample data', promptCode2Name:'sample data', promptCode3Name:'sample data', promptCode4Name:'sample data', promptCode5Name:'sample data', promptCode6Name:'sample data', promptDate1Name:'sample data', promptDate2Name:'sample data', promptText1Name:'sample data', promptText2Name:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {letterId:'sample data', letterIdSuffix:'sample data', description:'sample data', letterType:'sample data', letterReasonCode:'sample data', printBatch:'sample data', addresseeType:'sample data', promptCode1Name:'sample data', promptCode2Name:'sample data', promptCode3Name:'sample data', promptCode4Name:'sample data', promptCode5Name:'sample data', promptCode6Name:'sample data', promptDate1Name:'sample data', promptDate2Name:'sample data', promptText1Name:'sample data', promptText2Name:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getLetterTemplates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(letterTemplate);
    });
  });


  describe('#createLetterTemplate', () => {
    var id = 1;
    it('should return an Promise<LetterTemplate>', () => {
      const letterTemplate: LetterTemplate = {letterId:'sample data', letterIdSuffix:'sample data', description:'sample data', letterType:'sample data', letterReasonCode:'sample data', printBatch:'sample data', addresseeType:'sample data', promptCode1Name:'sample data', promptCode2Name:'sample data', promptCode3Name:'sample data', promptCode4Name:'sample data', promptCode5Name:'sample data', promptCode6Name:'sample data', promptDate1Name:'sample data', promptDate2Name:'sample data', promptText1Name:'sample data', promptText2Name:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createLetterTemplate(letterTemplate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLetterTemplate', () => {
    var id = 1;
    it('should return an Promise<LetterTemplate>', () => {
      const letterTemplate: LetterTemplate = {letterId:'sample data', letterIdSuffix:'sample data', description:'sample data', letterType:'sample data', letterReasonCode:'sample data', printBatch:'sample data', addresseeType:'sample data', promptCode1Name:'sample data', promptCode2Name:'sample data', promptCode3Name:'sample data', promptCode4Name:'sample data', promptCode5Name:'sample data', promptCode6Name:'sample data', promptDate1Name:'sample data', promptDate2Name:'sample data', promptText1Name:'sample data', promptText2Name:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateLetterTemplate(letterTemplate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLetterTemplate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLetterTemplate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/lettertemplates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});