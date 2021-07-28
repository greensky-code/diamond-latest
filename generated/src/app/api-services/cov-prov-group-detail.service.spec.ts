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

import { CovProvGroupDetailService } from './cov-prov-group-detail.service';
import { CovProvGroupDetail } from '../api-models/cov-prov-group-detail.model'
import { CovProvGroupDetails } from "../api-models/testing/fake-cov-prov-group-detail.model"

describe('CovProvGroupDetailService', () => {
  let injector: TestBed;
  let service: CovProvGroupDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CovProvGroupDetailService]
    });
    injector = getTestBed();
    service = injector.get(CovProvGroupDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCovProvGroupDetails', () => {
    it('should return an Promise<CovProvGroupDetail[]>', () => {
      const covProvGroupDetail = [
       {seqCovProvGrp:1234, seqProvId:1234, reimbMethod:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasn:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234},
       {seqCovProvGrp:1234, seqProvId:1234, reimbMethod:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasn:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234},
       {seqCovProvGrp:1234, seqProvId:1234, reimbMethod:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasn:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234}

      ];
      service.getCovProvGroupDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(covProvGroupDetail);
    });
  });


  describe('#createCovProvGroupDetail', () => {
    var id = 1;
    it('should return an Promise<CovProvGroupDetail>', () => {
      const covProvGroupDetail: CovProvGroupDetail = {seqCovProvGrp:1234, seqProvId:1234, reimbMethod:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasn:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234};
      service.createCovProvGroupDetail(covProvGroupDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCovProvGroupDetail', () => {
    var id = 1;
    it('should return an Promise<CovProvGroupDetail>', () => {
      const covProvGroupDetail: CovProvGroupDetail = {seqCovProvGrp:1234, seqProvId:1234, reimbMethod:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReasn:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqDfltVendId:1234, seqDfltVendAddress:1234};
      service.updateCovProvGroupDetail(covProvGroupDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCovProvGroupDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCovProvGroupDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/covprovgroupdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});