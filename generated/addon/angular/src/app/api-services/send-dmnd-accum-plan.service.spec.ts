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

import { SendDmndAccumPlanService } from './send-dmnd-accum-plan.service';
import { SendDmndAccumPlan } from '../api-models/send-dmnd-accum-plan.model'
import { SendDmndAccumPlans } from "../api-models/testing/fake-send-dmnd-accum-plan.model"

describe('SendDmndAccumPlanService', () => {
  let injector: TestBed;
  let service: SendDmndAccumPlanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SendDmndAccumPlanService]
    });
    injector = getTestBed();
    service = injector.get(SendDmndAccumPlanService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSendDmndAccumPlans', () => {
    it('should return an Promise<SendDmndAccumPlan[]>', () => {
      const sendDmndAccumPlan = [
       {pReqGroupNumber:'sample data', pReqBenOptCode:'sample data', pReqSrcSysCode:'sample data', pReqAsOfDate:'sample data', pReqStateCode:'sample data', oOutcomeCode:'sample data'},
       {pReqGroupNumber:'sample data', pReqBenOptCode:'sample data', pReqSrcSysCode:'sample data', pReqAsOfDate:'sample data', pReqStateCode:'sample data', oOutcomeCode:'sample data'},
       {pReqGroupNumber:'sample data', pReqBenOptCode:'sample data', pReqSrcSysCode:'sample data', pReqAsOfDate:'sample data', pReqStateCode:'sample data', oOutcomeCode:'sample data'}

      ];
      service.getSendDmndAccumPlans().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccumplans/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(sendDmndAccumPlan);
    });
  });


  describe('#createSendDmndAccumPlan', () => {
    var id = 1;
    it('should return an Promise<SendDmndAccumPlan>', () => {
      const sendDmndAccumPlan: SendDmndAccumPlan = {pReqGroupNumber:'sample data', pReqBenOptCode:'sample data', pReqSrcSysCode:'sample data', pReqAsOfDate:'sample data', pReqStateCode:'sample data', oOutcomeCode:'sample data'};
      service.createSendDmndAccumPlan(sendDmndAccumPlan).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccumplans`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSendDmndAccumPlan', () => {
    var id = 1;
    it('should return an Promise<SendDmndAccumPlan>', () => {
      const sendDmndAccumPlan: SendDmndAccumPlan = {pReqGroupNumber:'sample data', pReqBenOptCode:'sample data', pReqSrcSysCode:'sample data', pReqAsOfDate:'sample data', pReqStateCode:'sample data', oOutcomeCode:'sample data'};
      service.updateSendDmndAccumPlan(sendDmndAccumPlan, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccumplans/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSendDmndAccumPlan', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSendDmndAccumPlan(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/senddmndaccumplans/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});