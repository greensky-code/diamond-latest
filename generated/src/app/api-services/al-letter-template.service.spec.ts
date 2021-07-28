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

import { AlLetterTemplateService } from './al-letter-template.service';
import { AlLetterTemplate } from '../api-models/al-letter-template.model'
import { AlLetterTemplates } from "../api-models/testing/fake-al-letter-template.model"

describe('AlLetterTemplateService', () => {
  let injector: TestBed;
  let service: AlLetterTemplateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLetterTemplateService]
    });
    injector = getTestBed();
    service = injector.get(AlLetterTemplateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLetterTemplates', () => {
    it('should return an Promise<AlLetterTemplate[]>', () => {
      const alLetterTemplate = [
       {seqLetterTempId:1234, letterType:'sample data', letterTemplateId:'sample data', description:'sample data', letterGroupFlag:'sample data', overrideDistributionMethod:'sample data', primaryDistributionSource:'sample data', viewHistoryFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterTempId:1234, letterType:'sample data', letterTemplateId:'sample data', description:'sample data', letterGroupFlag:'sample data', overrideDistributionMethod:'sample data', primaryDistributionSource:'sample data', viewHistoryFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterTempId:1234, letterType:'sample data', letterTemplateId:'sample data', description:'sample data', letterGroupFlag:'sample data', overrideDistributionMethod:'sample data', primaryDistributionSource:'sample data', viewHistoryFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAlLetterTemplates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLetterTemplate);
    });
  });


  describe('#createAlLetterTemplate', () => {
    var id = 1;
    it('should return an Promise<AlLetterTemplate>', () => {
      const alLetterTemplate: AlLetterTemplate = {seqLetterTempId:1234, letterType:'sample data', letterTemplateId:'sample data', description:'sample data', letterGroupFlag:'sample data', overrideDistributionMethod:'sample data', primaryDistributionSource:'sample data', viewHistoryFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAlLetterTemplate(alLetterTemplate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLetterTemplate', () => {
    var id = 1;
    it('should return an Promise<AlLetterTemplate>', () => {
      const alLetterTemplate: AlLetterTemplate = {seqLetterTempId:1234, letterType:'sample data', letterTemplateId:'sample data', description:'sample data', letterGroupFlag:'sample data', overrideDistributionMethod:'sample data', primaryDistributionSource:'sample data', viewHistoryFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAlLetterTemplate(alLetterTemplate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLetterTemplate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLetterTemplate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});