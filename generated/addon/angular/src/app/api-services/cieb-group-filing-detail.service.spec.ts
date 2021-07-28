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

import { CiebGroupFilingDetailService } from './cieb-group-filing-detail.service';
import { CiebGroupFilingDetail } from '../api-models/cieb-group-filing-detail.model'
import { CiebGroupFilingDetails } from "../api-models/testing/fake-cieb-group-filing-detail.model"

describe('CiebGroupFilingDetailService', () => {
  let injector: TestBed;
  let service: CiebGroupFilingDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebGroupFilingDetailService]
    });
    injector = getTestBed();
    service = injector.get(CiebGroupFilingDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebGroupFilingDetails', () => {
    it('should return an Promise<CiebGroupFilingDetail[]>', () => {
      const ciebGroupFilingDetail = [
       {seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebGroupFilingDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupfilingdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebGroupFilingDetail);
    });
  });


  describe('#createCiebGroupFilingDetail', () => {
    var id = 1;
    it('should return an Promise<CiebGroupFilingDetail>', () => {
      const ciebGroupFilingDetail: CiebGroupFilingDetail = {seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebGroupFilingDetail(ciebGroupFilingDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupfilingdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebGroupFilingDetail', () => {
    var id = 1;
    it('should return an Promise<CiebGroupFilingDetail>', () => {
      const ciebGroupFilingDetail: CiebGroupFilingDetail = {seqGrpfilingId:1234, seqGroupId:1234, seqGrpParentId:1234, filingType:'sample data', situsState:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', changeReason:'sample data', applyToSubgroup:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebGroupFilingDetail(ciebGroupFilingDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupfilingdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebGroupFilingDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebGroupFilingDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupfilingdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});