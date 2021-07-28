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

import { GetBenefitPackageIdService } from './get-benefit-package-id.service';
import { GetBenefitPackageId } from '../api-models/get-benefit-package-id.model'
import { GetBenefitPackageIds } from "../api-models/testing/fake-get-benefit-package-id.model"

describe('GetBenefitPackageIdService', () => {
  let injector: TestBed;
  let service: GetBenefitPackageIdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetBenefitPackageIdService]
    });
    injector = getTestBed();
    service = injector.get(GetBenefitPackageIdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetBenefitPackageIds', () => {
    it('should return an Promise<GetBenefitPackageId[]>', () => {
      const getBenefitPackageId = [
       {pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data'},
       {pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data'},
       {pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data'}

      ];
      service.getGetBenefitPackageIds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getbenefitpackageids/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getBenefitPackageId);
    });
  });


  describe('#createGetBenefitPackageId', () => {
    var id = 1;
    it('should return an Promise<GetBenefitPackageId>', () => {
      const getBenefitPackageId: GetBenefitPackageId = {pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data'};
      service.createGetBenefitPackageId(getBenefitPackageId).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getbenefitpackageids`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetBenefitPackageId', () => {
    var id = 1;
    it('should return an Promise<GetBenefitPackageId>', () => {
      const getBenefitPackageId: GetBenefitPackageId = {pSeqGroupId:1234, pPlanCode:'sample data', pSvcStartDt:'sample data'};
      service.updateGetBenefitPackageId(getBenefitPackageId, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getbenefitpackageids/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetBenefitPackageId', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetBenefitPackageId(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getbenefitpackageids/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});