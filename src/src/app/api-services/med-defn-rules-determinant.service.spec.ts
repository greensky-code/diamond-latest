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

import { MedDefnRulesDeterminantService } from './med-defn-rules-determinant.service';
import { MedDefnRulesDeterminant } from '../api-models/med-defn-rules-determinant.model'
import { MedDefnRulesDeterminants } from "../api-models/testing/fake-med-defn-rules-determinant.model"

describe('MedDefnRulesDeterminantService', () => {
  let injector: TestBed;
  let service: MedDefnRulesDeterminantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedDefnRulesDeterminantService]
    });
    injector = getTestBed();
    service = injector.get(MedDefnRulesDeterminantService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMedDefnRulesDeterminants', () => {
    it('should return an Promise<MedDefnRulesDeterminant[]>', () => {
      const medDefnRulesDeterminant = [
       {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantSequence:1234, detValueFrom:'sample data', detValueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', codeType:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'},
       {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantSequence:1234, detValueFrom:'sample data', detValueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', codeType:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'},
       {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantSequence:1234, detValueFrom:'sample data', detValueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', codeType:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'}

      ];
      service.getMedDefnRulesDeterminants().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnrulesdeterminants/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(medDefnRulesDeterminant);
    });
  });


  describe('#createMedDefnRulesDeterminant', () => {
    var id = 1;
    it('should return an Promise<MedDefnRulesDeterminant>', () => {
      const medDefnRulesDeterminant: MedDefnRulesDeterminant = {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantSequence:1234, detValueFrom:'sample data', detValueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', codeType:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'};
      service.createMedDefnRulesDeterminant(medDefnRulesDeterminant).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnrulesdeterminants`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMedDefnRulesDeterminant', () => {
    var id = 1;
    it('should return an Promise<MedDefnRulesDeterminant>', () => {
      const medDefnRulesDeterminant: MedDefnRulesDeterminant = {claimType:'sample data', medDefOrder:1234, medDefCode:'sample data', searchSequence:1234, determinantSequence:1234, detValueFrom:'sample data', detValueThru:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', codeType:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'};
      service.updateMedDefnRulesDeterminant(medDefnRulesDeterminant, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnrulesdeterminants/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMedDefnRulesDeterminant', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMedDefnRulesDeterminant(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnrulesdeterminants/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});