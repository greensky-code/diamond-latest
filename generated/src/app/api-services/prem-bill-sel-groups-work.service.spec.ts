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

import { PremBillSelGroupsWorkService } from './prem-bill-sel-groups-work.service';
import { PremBillSelGroupsWork } from '../api-models/prem-bill-sel-groups-work.model'
import { PremBillSelGroupsWorks } from "../api-models/testing/fake-prem-bill-sel-groups-work.model"

describe('PremBillSelGroupsWorkService', () => {
  let injector: TestBed;
  let service: PremBillSelGroupsWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PremBillSelGroupsWorkService]
    });
    injector = getTestBed();
    service = injector.get(PremBillSelGroupsWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPremBillSelGroupsWorks', () => {
    it('should return an Promise<PremBillSelGroupsWork[]>', () => {
      const premBillSelGroupsWork = [
       {seqGpbilId:1234, seqGroupId:1234, groupId:'sample data', shortName:'sample data', seqParentId:1234, customerType:'sample data', customerId:'sample data', groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', billingDatetime:'2018-01-01', sortOption:'sample data', retroRatesFlag:'sample data', country:'sample data'},
       {seqGpbilId:1234, seqGroupId:1234, groupId:'sample data', shortName:'sample data', seqParentId:1234, customerType:'sample data', customerId:'sample data', groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', billingDatetime:'2018-01-01', sortOption:'sample data', retroRatesFlag:'sample data', country:'sample data'},
       {seqGpbilId:1234, seqGroupId:1234, groupId:'sample data', shortName:'sample data', seqParentId:1234, customerType:'sample data', customerId:'sample data', groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', billingDatetime:'2018-01-01', sortOption:'sample data', retroRatesFlag:'sample data', country:'sample data'}

      ];
      service.getPremBillSelGroupsWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/prembillselgroupsworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(premBillSelGroupsWork);
    });
  });


  describe('#createPremBillSelGroupsWork', () => {
    var id = 1;
    it('should return an Promise<PremBillSelGroupsWork>', () => {
      const premBillSelGroupsWork: PremBillSelGroupsWork = {seqGpbilId:1234, seqGroupId:1234, groupId:'sample data', shortName:'sample data', seqParentId:1234, customerType:'sample data', customerId:'sample data', groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', billingDatetime:'2018-01-01', sortOption:'sample data', retroRatesFlag:'sample data', country:'sample data'};
      service.createPremBillSelGroupsWork(premBillSelGroupsWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillselgroupsworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePremBillSelGroupsWork', () => {
    var id = 1;
    it('should return an Promise<PremBillSelGroupsWork>', () => {
      const premBillSelGroupsWork: PremBillSelGroupsWork = {seqGpbilId:1234, seqGroupId:1234, groupId:'sample data', shortName:'sample data', seqParentId:1234, customerType:'sample data', customerId:'sample data', groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', billingDatetime:'2018-01-01', sortOption:'sample data', retroRatesFlag:'sample data', country:'sample data'};
      service.updatePremBillSelGroupsWork(premBillSelGroupsWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillselgroupsworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePremBillSelGroupsWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePremBillSelGroupsWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/prembillselgroupsworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});