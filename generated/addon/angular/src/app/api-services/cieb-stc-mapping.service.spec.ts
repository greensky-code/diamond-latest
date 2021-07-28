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

import { CiebStcMappingService } from './cieb-stc-mapping.service';
import { CiebStcMapping } from '../api-models/cieb-stc-mapping.model'
import { CiebStcMappings } from "../api-models/testing/fake-cieb-stc-mapping.model"

describe('CiebStcMappingService', () => {
  let injector: TestBed;
  let service: CiebStcMappingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebStcMappingService]
    });
    injector = getTestBed();
    service = injector.get(CiebStcMappingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebStcMappings', () => {
    it('should return an Promise<CiebStcMapping[]>', () => {
      const ciebStcMapping = [
       {seqStcId:1234, svcTypeCode:'sample data', stcCovgType:'sample data', detailStc:'sample data', ruleGroupId:1234, ruleLevel:1234, medDefCode:'sample data', medDefDet:'sample data', medDefOrder:'sample data', shortRow:'sample data', ebQtyQual:'sample data', ebQty:'sample data', benPosCode:'sample data', msgText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ppacaMsgInd:'sample data'},
       {seqStcId:1234, svcTypeCode:'sample data', stcCovgType:'sample data', detailStc:'sample data', ruleGroupId:1234, ruleLevel:1234, medDefCode:'sample data', medDefDet:'sample data', medDefOrder:'sample data', shortRow:'sample data', ebQtyQual:'sample data', ebQty:'sample data', benPosCode:'sample data', msgText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ppacaMsgInd:'sample data'},
       {seqStcId:1234, svcTypeCode:'sample data', stcCovgType:'sample data', detailStc:'sample data', ruleGroupId:1234, ruleLevel:1234, medDefCode:'sample data', medDefDet:'sample data', medDefOrder:'sample data', shortRow:'sample data', ebQtyQual:'sample data', ebQty:'sample data', benPosCode:'sample data', msgText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ppacaMsgInd:'sample data'}

      ];
      service.getCiebStcMappings().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstcmappings/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebStcMapping);
    });
  });


  describe('#createCiebStcMapping', () => {
    var id = 1;
    it('should return an Promise<CiebStcMapping>', () => {
      const ciebStcMapping: CiebStcMapping = {seqStcId:1234, svcTypeCode:'sample data', stcCovgType:'sample data', detailStc:'sample data', ruleGroupId:1234, ruleLevel:1234, medDefCode:'sample data', medDefDet:'sample data', medDefOrder:'sample data', shortRow:'sample data', ebQtyQual:'sample data', ebQty:'sample data', benPosCode:'sample data', msgText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ppacaMsgInd:'sample data'};
      service.createCiebStcMapping(ciebStcMapping).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstcmappings`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebStcMapping', () => {
    var id = 1;
    it('should return an Promise<CiebStcMapping>', () => {
      const ciebStcMapping: CiebStcMapping = {seqStcId:1234, svcTypeCode:'sample data', stcCovgType:'sample data', detailStc:'sample data', ruleGroupId:1234, ruleLevel:1234, medDefCode:'sample data', medDefDet:'sample data', medDefOrder:'sample data', shortRow:'sample data', ebQtyQual:'sample data', ebQty:'sample data', benPosCode:'sample data', msgText:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', ppacaMsgInd:'sample data'};
      service.updateCiebStcMapping(ciebStcMapping, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstcmappings/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebStcMapping', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebStcMapping(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebstcmappings/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});