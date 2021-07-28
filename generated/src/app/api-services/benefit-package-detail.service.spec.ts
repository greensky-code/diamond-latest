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

import { BenefitPackageDetailService } from './benefit-package-detail.service';
import { BenefitPackageDetail } from '../api-models/benefit-package-detail.model'
import { BenefitPackageDetails } from "../api-models/testing/fake-benefit-package-detail.model"

describe('BenefitPackageDetailService', () => {
  let injector: TestBed;
  let service: BenefitPackageDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitPackageDetailService]
    });
    injector = getTestBed();
    service = injector.get(BenefitPackageDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefitPackageDetails', () => {
    it('should return an Promise<BenefitPackageDetail[]>', () => {
      const benefitPackageDetail = [
       {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', parProvReq:'sample data', authReq:'sample data', riderReqFilter:'sample data', supDepRule:'sample data', noMosContFrom:1234, noMosContThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', processingOrder:1234, riderOperator:'sample data', adjustForOcPaid:'sample data', parOperator:'sample data', authOperator:'sample data', applyPar:'sample data', authLevel:'sample data', applyRider:'sample data', weightedValueAccum:'sample data'},
       {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', parProvReq:'sample data', authReq:'sample data', riderReqFilter:'sample data', supDepRule:'sample data', noMosContFrom:1234, noMosContThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', processingOrder:1234, riderOperator:'sample data', adjustForOcPaid:'sample data', parOperator:'sample data', authOperator:'sample data', applyPar:'sample data', authLevel:'sample data', applyRider:'sample data', weightedValueAccum:'sample data'},
       {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', parProvReq:'sample data', authReq:'sample data', riderReqFilter:'sample data', supDepRule:'sample data', noMosContFrom:1234, noMosContThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', processingOrder:1234, riderOperator:'sample data', adjustForOcPaid:'sample data', parOperator:'sample data', authOperator:'sample data', applyPar:'sample data', authLevel:'sample data', applyRider:'sample data', weightedValueAccum:'sample data'}

      ];
      service.getBenefitPackageDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagedetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitPackageDetail);
    });
  });


  describe('#createBenefitPackageDetail', () => {
    var id = 1;
    it('should return an Promise<BenefitPackageDetail>', () => {
      const benefitPackageDetail: BenefitPackageDetail = {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', parProvReq:'sample data', authReq:'sample data', riderReqFilter:'sample data', supDepRule:'sample data', noMosContFrom:1234, noMosContThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', processingOrder:1234, riderOperator:'sample data', adjustForOcPaid:'sample data', parOperator:'sample data', authOperator:'sample data', applyPar:'sample data', authLevel:'sample data', applyRider:'sample data', weightedValueAccum:'sample data'};
      service.createBenefitPackageDetail(benefitPackageDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagedetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitPackageDetail', () => {
    var id = 1;
    it('should return an Promise<BenefitPackageDetail>', () => {
      const benefitPackageDetail: BenefitPackageDetail = {benefitPackageId:'sample data', seqBenPackage:1234, benefitRule:'sample data', startDate:'2018-01-01', endDate:'2018-01-01', parProvReq:'sample data', authReq:'sample data', riderReqFilter:'sample data', supDepRule:'sample data', noMosContFrom:1234, noMosContThru:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', processingOrder:1234, riderOperator:'sample data', adjustForOcPaid:'sample data', parOperator:'sample data', authOperator:'sample data', applyPar:'sample data', authLevel:'sample data', applyRider:'sample data', weightedValueAccum:'sample data'};
      service.updateBenefitPackageDetail(benefitPackageDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagedetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitPackageDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitPackageDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagedetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});