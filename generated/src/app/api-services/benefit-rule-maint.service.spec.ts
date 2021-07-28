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

import { BenefitRuleMaintService } from './benefit-rule-maint.service';
import { BenefitRuleMaint } from '../api-models/benefit-rule-maint.model'
import { BenefitRuleMaints } from "../api-models/testing/fake-benefit-rule-maint.model"

describe('BenefitRuleMaintService', () => {
  let injector: TestBed;
  let service: BenefitRuleMaintService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitRuleMaintService]
    });
    injector = getTestBed();
    service = injector.get(BenefitRuleMaintService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefitRuleMaints', () => {
    it('should return an Promise<BenefitRuleMaint[]>', () => {
      const benefitRuleMaint = [
       {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', type:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', type:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', type:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBenefitRuleMaints().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrulemaints/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitRuleMaint);
    });
  });


  describe('#createBenefitRuleMaint', () => {
    var id = 1;
    it('should return an Promise<BenefitRuleMaint>', () => {
      const benefitRuleMaint: BenefitRuleMaint = {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', type:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBenefitRuleMaint(benefitRuleMaint).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrulemaints`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitRuleMaint', () => {
    var id = 1;
    it('should return an Promise<BenefitRuleMaint>', () => {
      const benefitRuleMaint: BenefitRuleMaint = {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', type:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBenefitRuleMaint(benefitRuleMaint, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrulemaints/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitRuleMaint', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitRuleMaint(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitrulemaints/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
