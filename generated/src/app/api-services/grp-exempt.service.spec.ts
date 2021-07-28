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

import { GrpExemptService } from './grp-exempt.service';
import { GrpExempt } from '../api-models/grp-exempt.model'
import { GrpExempts } from "../api-models/testing/fake-grp-exempt.model"

describe('GrpExemptService', () => {
  let injector: TestBed;
  let service: GrpExemptService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GrpExemptService]
    });
    injector = getTestBed();
    service = injector.get(GrpExemptService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGrpExempts', () => {
    it('should return an Promise<GrpExempt[]>', () => {
      const grpExempt = [
       {pSeqTaxDetailId:1234, pGroupId:'sample data', pTaxRegion:'sample data', pTaxType:'sample data', pExemptProduct:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pError:'sample data'},
       {pSeqTaxDetailId:1234, pGroupId:'sample data', pTaxRegion:'sample data', pTaxType:'sample data', pExemptProduct:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pError:'sample data'},
       {pSeqTaxDetailId:1234, pGroupId:'sample data', pTaxRegion:'sample data', pTaxType:'sample data', pExemptProduct:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pError:'sample data'}

      ];
      service.getGrpExempts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/grpexempts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(grpExempt);
    });
  });


  describe('#createGrpExempt', () => {
    var id = 1;
    it('should return an Promise<GrpExempt>', () => {
      const grpExempt: GrpExempt = {pSeqTaxDetailId:1234, pGroupId:'sample data', pTaxRegion:'sample data', pTaxType:'sample data', pExemptProduct:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pError:'sample data'};
      service.createGrpExempt(grpExempt).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/grpexempts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGrpExempt', () => {
    var id = 1;
    it('should return an Promise<GrpExempt>', () => {
      const grpExempt: GrpExempt = {pSeqTaxDetailId:1234, pGroupId:'sample data', pTaxRegion:'sample data', pTaxType:'sample data', pExemptProduct:'sample data', pEffectiveDate:'sample data', pTermDate:'sample data', pTermReasonCode:'sample data', pApplyRetro:'sample data', pError:'sample data'};
      service.updateGrpExempt(grpExempt, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/grpexempts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGrpExempt', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGrpExempt(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/grpexempts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});