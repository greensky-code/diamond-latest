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

import { CapReportWorkService } from './cap-report-work.service';
import { CapReportWork } from '../api-models/cap-report-work.model'
import { CapReportWorks } from "../api-models/testing/fake-cap-report-work.model"

describe('CapReportWorkService', () => {
  let injector: TestBed;
  let service: CapReportWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapReportWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapReportWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapReportWorks', () => {
    it('should return an Promise<CapReportWork[]>', () => {
      const capReportWork = [
       {seqCcalcId:1234, seqCapRptWork:1234, seqCapRptDetailWork:1234, capModelId:'sample data', capMonth:'2018-01-01', vendorId:'sample data', vendorFullName:'sample data', providerId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', providerType:'sample data', specialtyType:'sample data', groupId:'sample data', parentGroupId:'sample data', groupShortName:'sample data', subscriberId:'sample data', personNumber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberMiddleInitial:'sample data', memberAge:1234, memberGender:'sample data', planCode:'sample data', copaymentAmt:1234, capPool1Amt:1234, capPool1Withhold:1234, capPool2Amt:1234, capPool2Withhold:1234},
       {seqCcalcId:1234, seqCapRptWork:1234, seqCapRptDetailWork:1234, capModelId:'sample data', capMonth:'2018-01-01', vendorId:'sample data', vendorFullName:'sample data', providerId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', providerType:'sample data', specialtyType:'sample data', groupId:'sample data', parentGroupId:'sample data', groupShortName:'sample data', subscriberId:'sample data', personNumber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberMiddleInitial:'sample data', memberAge:1234, memberGender:'sample data', planCode:'sample data', copaymentAmt:1234, capPool1Amt:1234, capPool1Withhold:1234, capPool2Amt:1234, capPool2Withhold:1234},
       {seqCcalcId:1234, seqCapRptWork:1234, seqCapRptDetailWork:1234, capModelId:'sample data', capMonth:'2018-01-01', vendorId:'sample data', vendorFullName:'sample data', providerId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', providerType:'sample data', specialtyType:'sample data', groupId:'sample data', parentGroupId:'sample data', groupShortName:'sample data', subscriberId:'sample data', personNumber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberMiddleInitial:'sample data', memberAge:1234, memberGender:'sample data', planCode:'sample data', copaymentAmt:1234, capPool1Amt:1234, capPool1Withhold:1234, capPool2Amt:1234, capPool2Withhold:1234}

      ];
      service.getCapReportWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capreportworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capReportWork);
    });
  });


  describe('#createCapReportWork', () => {
    var id = 1;
    it('should return an Promise<CapReportWork>', () => {
      const capReportWork: CapReportWork = {seqCcalcId:1234, seqCapRptWork:1234, seqCapRptDetailWork:1234, capModelId:'sample data', capMonth:'2018-01-01', vendorId:'sample data', vendorFullName:'sample data', providerId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', providerType:'sample data', specialtyType:'sample data', groupId:'sample data', parentGroupId:'sample data', groupShortName:'sample data', subscriberId:'sample data', personNumber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberMiddleInitial:'sample data', memberAge:1234, memberGender:'sample data', planCode:'sample data', copaymentAmt:1234, capPool1Amt:1234, capPool1Withhold:1234, capPool2Amt:1234, capPool2Withhold:1234};
      service.createCapReportWork(capReportWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capreportworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapReportWork', () => {
    var id = 1;
    it('should return an Promise<CapReportWork>', () => {
      const capReportWork: CapReportWork = {seqCcalcId:1234, seqCapRptWork:1234, seqCapRptDetailWork:1234, capModelId:'sample data', capMonth:'2018-01-01', vendorId:'sample data', vendorFullName:'sample data', providerId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', providerType:'sample data', specialtyType:'sample data', groupId:'sample data', parentGroupId:'sample data', groupShortName:'sample data', subscriberId:'sample data', personNumber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberMiddleInitial:'sample data', memberAge:1234, memberGender:'sample data', planCode:'sample data', copaymentAmt:1234, capPool1Amt:1234, capPool1Withhold:1234, capPool2Amt:1234, capPool2Withhold:1234};
      service.updateCapReportWork(capReportWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capreportworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapReportWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapReportWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capreportworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});