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

import { BenefitAccumWeightDetailService } from './benefit-accum-weight-detail.service';
import { BenefitAccumWeightDetail } from '../api-models/benefit-accum-weight-detail.model'
import { BenefitAccumWeightDetails } from "../api-models/testing/fake-benefit-accum-weight-detail.model"

describe('BenefitAccumWeightDetailService', () => {
  let injector: TestBed;
  let service: BenefitAccumWeightDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitAccumWeightDetailService]
    });
    injector = getTestBed();
    service = injector.get(BenefitAccumWeightDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefitAccumWeightDetails', () => {
    it('should return an Promise<BenefitAccumWeightDetail[]>', () => {
      const benefitAccumWeightDetail = [
       {accumulatorId:'sample data', seqAccumId:1234, fromValue:'sample data', thruValue:'sample data', primaryGroup:'sample data', secondaryGroup:'sample data', weightedAccum:1234, effectiveDate:'2018-01-01', thruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {accumulatorId:'sample data', seqAccumId:1234, fromValue:'sample data', thruValue:'sample data', primaryGroup:'sample data', secondaryGroup:'sample data', weightedAccum:1234, effectiveDate:'2018-01-01', thruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {accumulatorId:'sample data', seqAccumId:1234, fromValue:'sample data', thruValue:'sample data', primaryGroup:'sample data', secondaryGroup:'sample data', weightedAccum:1234, effectiveDate:'2018-01-01', thruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBenefitAccumWeightDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweightdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitAccumWeightDetail);
    });
  });


  describe('#createBenefitAccumWeightDetail', () => {
    var id = 1;
    it('should return an Promise<BenefitAccumWeightDetail>', () => {
      const benefitAccumWeightDetail: BenefitAccumWeightDetail = {accumulatorId:'sample data', seqAccumId:1234, fromValue:'sample data', thruValue:'sample data', primaryGroup:'sample data', secondaryGroup:'sample data', weightedAccum:1234, effectiveDate:'2018-01-01', thruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBenefitAccumWeightDetail(benefitAccumWeightDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweightdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitAccumWeightDetail', () => {
    var id = 1;
    it('should return an Promise<BenefitAccumWeightDetail>', () => {
      const benefitAccumWeightDetail: BenefitAccumWeightDetail = {accumulatorId:'sample data', seqAccumId:1234, fromValue:'sample data', thruValue:'sample data', primaryGroup:'sample data', secondaryGroup:'sample data', weightedAccum:1234, effectiveDate:'2018-01-01', thruDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBenefitAccumWeightDetail(benefitAccumWeightDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweightdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitAccumWeightDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitAccumWeightDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweightdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});