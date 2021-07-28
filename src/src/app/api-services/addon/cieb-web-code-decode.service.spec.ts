/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CiebWebCodeDecodeService } from './cieb-web-code-decode.service';
import { CiebWebCodeDecode } from '../api-models/cieb-web-code-decode.model'
import { CiebWebCodeDecodes } from "../api-models/testing/fake-cieb-web-code-decode.model"

describe('CiebWebCodeDecodeService', () => {
  let injector: TestBed;
  let service: CiebWebCodeDecodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebWebCodeDecodeService]
    });
    injector = getTestBed();
    service = injector.get(CiebWebCodeDecodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebWebCodeDecodes', () => {
    it('should return an Promise<CiebWebCodeDecode[]>', () => {
      const ciebWebCodeDecode = [
       {seqCodeId:1234, codeType:'sample data', code:'sample data', decode1:'sample data', decode2:'sample data', decode3:'sample data', decode4:'sample data', userDefined1:'sample data', userDefined2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data'},
       {seqCodeId:1234, codeType:'sample data', code:'sample data', decode1:'sample data', decode2:'sample data', decode3:'sample data', decode4:'sample data', userDefined1:'sample data', userDefined2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data'},
       {seqCodeId:1234, codeType:'sample data', code:'sample data', decode1:'sample data', decode2:'sample data', decode3:'sample data', decode4:'sample data', userDefined1:'sample data', userDefined2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data'}

      ];
      service.getCiebWebCodeDecodes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwebcodedecodes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebWebCodeDecode);
    });
  });


  describe('#createCiebWebCodeDecode', () => {
    var id = 1;
    it('should return an Promise<CiebWebCodeDecode>', () => {
      const ciebWebCodeDecode: CiebWebCodeDecode = {seqCodeId:1234, codeType:'sample data', code:'sample data', decode1:'sample data', decode2:'sample data', decode3:'sample data', decode4:'sample data', userDefined1:'sample data', userDefined2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data'};
      service.createCiebWebCodeDecode(ciebWebCodeDecode).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwebcodedecodes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebWebCodeDecode', () => {
    var id = 1;
    it('should return an Promise<CiebWebCodeDecode>', () => {
      const ciebWebCodeDecode: CiebWebCodeDecode = {seqCodeId:1234, codeType:'sample data', code:'sample data', decode1:'sample data', decode2:'sample data', decode3:'sample data', decode4:'sample data', userDefined1:'sample data', userDefined2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data'};
      service.updateCiebWebCodeDecode(ciebWebCodeDecode, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwebcodedecodes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebWebCodeDecode', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebWebCodeDecode(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebwebcodedecodes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});