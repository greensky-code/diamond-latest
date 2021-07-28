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

import { GetGroupPlanDetailsService } from './get-group-plan-details.service';
import { GetGroupPlanDetails } from '../api-models/get-group-plan-details.model'
import { GetGroupPlanDetail } from "../api-models/testing/fake-get-group-plan-details.model"

describe('GetGroupPlanDetailsService', () => {
  let injector: TestBed;
  let service: GetGroupPlanDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetGroupPlanDetailsService]
    });
    injector = getTestBed();
    service = injector.get(GetGroupPlanDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetGroupPlanDetail', () => {
    it('should return an Promise<GetGroupPlanDetails[]>', () => {
      const getGroupPlanDetails = [
       {pGroupId:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data'},
       {pGroupId:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data'},
       {pGroupId:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data'}

      ];
      service.getGetGroupPlanDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupplandetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getGroupPlanDetails);
    });
  });


  describe('#createGetGroupPlanDetails', () => {
    var id = 1;
    it('should return an Promise<GetGroupPlanDetails>', () => {
      const getGroupPlanDetails: GetGroupPlanDetails = {pGroupId:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data'};
      service.createGetGroupPlanDetails(getGroupPlanDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupplandetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetGroupPlanDetails', () => {
    var id = 1;
    it('should return an Promise<GetGroupPlanDetails>', () => {
      const getGroupPlanDetails: GetGroupPlanDetails = {pGroupId:'sample data', oHaadPrdCd:'sample data', oDhaPrdCd:'sample data', oOtherUaePrdCd:'sample data'};
      service.updateGetGroupPlanDetails(getGroupPlanDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupplandetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetGroupPlanDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetGroupPlanDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupplandetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});