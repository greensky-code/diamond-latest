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

import { MedDefnRulesService } from './med-defn-rules.service';
import { MedDefnRules } from '../api-models/med-defn-rules.model'
import { MedDefnRuleses } from "../api-models/testing/fake-med-defn-rules.model"

describe('MedDefnRulesService', () => {
  let injector: TestBed;
  let service: MedDefnRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedDefnRulesService]
    });
    injector = getTestBed();
    service = injector.get(MedDefnRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMedDefnRuleses', () => {
    it('should return an Promise<MedDefnRules[]>', () => {
      const medDefnRules = [
       {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantTable:'sample data', determinant:'sample data', description:'sample data', operator:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', detValue4:'sample data', detValue5:'sample data', detValue6:'sample data', detValue7:'sample data', detValue8:'sample data', detValue9:'sample data', detValue10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', globalIncludeFlag:'sample data'},
       {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantTable:'sample data', determinant:'sample data', description:'sample data', operator:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', detValue4:'sample data', detValue5:'sample data', detValue6:'sample data', detValue7:'sample data', detValue8:'sample data', detValue9:'sample data', detValue10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', globalIncludeFlag:'sample data'},
       {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantTable:'sample data', determinant:'sample data', description:'sample data', operator:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', detValue4:'sample data', detValue5:'sample data', detValue6:'sample data', detValue7:'sample data', detValue8:'sample data', detValue9:'sample data', detValue10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', globalIncludeFlag:'sample data'}

      ];
      service.getMedDefnRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(medDefnRules);
    });
  });


  describe('#createMedDefnRules', () => {
    var id = 1;
    it('should return an Promise<MedDefnRules>', () => {
      const medDefnRules: MedDefnRules = {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantTable:'sample data', determinant:'sample data', description:'sample data', operator:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', detValue4:'sample data', detValue5:'sample data', detValue6:'sample data', detValue7:'sample data', detValue8:'sample data', detValue9:'sample data', detValue10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', globalIncludeFlag:'sample data'};
      service.createMedDefnRules(medDefnRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMedDefnRules', () => {
    var id = 1;
    it('should return an Promise<MedDefnRules>', () => {
      const medDefnRules: MedDefnRules = {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantTable:'sample data', determinant:'sample data', description:'sample data', operator:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data', detValue4:'sample data', detValue5:'sample data', detValue6:'sample data', detValue7:'sample data', detValue8:'sample data', detValue9:'sample data', detValue10:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', globalIncludeFlag:'sample data'};
      service.updateMedDefnRules(medDefnRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMedDefnRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMedDefnRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});