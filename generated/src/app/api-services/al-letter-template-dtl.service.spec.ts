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

import { AlLetterTemplateDtlService } from './al-letter-template-dtl.service';
import { AlLetterTemplateDtl } from '../api-models/al-letter-template-dtl.model'
import { AlLetterTemplateDtls } from "../api-models/testing/fake-al-letter-template-dtl.model"

describe('AlLetterTemplateDtlService', () => {
  let injector: TestBed;
  let service: AlLetterTemplateDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlLetterTemplateDtlService]
    });
    injector = getTestBed();
    service = injector.get(AlLetterTemplateDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAlLetterTemplateDtls', () => {
    it('should return an Promise<AlLetterTemplateDtl[]>', () => {
      const alLetterTemplateDtl = [
       {seqLetterGroupId:1234, seqLetterTempId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterGroupId:1234, seqLetterTempId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqLetterGroupId:1234, seqLetterTempId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAlLetterTemplateDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplatedtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(alLetterTemplateDtl);
    });
  });


  describe('#createAlLetterTemplateDtl', () => {
    var id = 1;
    it('should return an Promise<AlLetterTemplateDtl>', () => {
      const alLetterTemplateDtl: AlLetterTemplateDtl = {seqLetterGroupId:1234, seqLetterTempId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAlLetterTemplateDtl(alLetterTemplateDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplatedtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAlLetterTemplateDtl', () => {
    var id = 1;
    it('should return an Promise<AlLetterTemplateDtl>', () => {
      const alLetterTemplateDtl: AlLetterTemplateDtl = {seqLetterGroupId:1234, seqLetterTempId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAlLetterTemplateDtl(alLetterTemplateDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplatedtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAlLetterTemplateDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAlLetterTemplateDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/allettertemplatedtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});