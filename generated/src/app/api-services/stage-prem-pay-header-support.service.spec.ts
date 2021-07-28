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

import { StagePremPayHeaderSupportService } from './stage-prem-pay-header-support.service';
import { StagePremPayHeaderSupport } from '../api-models/stage-prem-pay-header-support.model'
import { StagePremPayHeaderSupports } from "../api-models/testing/fake-stage-prem-pay-header-support.model"

describe('StagePremPayHeaderSupportService', () => {
  let injector: TestBed;
  let service: StagePremPayHeaderSupportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePremPayHeaderSupportService]
    });
    injector = getTestBed();
    service = injector.get(StagePremPayHeaderSupportService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePremPayHeaderSupports', () => {
    it('should return an Promise<StagePremPayHeaderSupport[]>', () => {
      const stagePremPayHeaderSupport = [
       {batchId:'sample data', transactionId:1234, seqGroupId:1234, groupId:'sample data', subscriberId:'sample data', groupType:'sample data', paymentForIndividual:'sample data', itemCount:1234},
       {batchId:'sample data', transactionId:1234, seqGroupId:1234, groupId:'sample data', subscriberId:'sample data', groupType:'sample data', paymentForIndividual:'sample data', itemCount:1234},
       {batchId:'sample data', transactionId:1234, seqGroupId:1234, groupId:'sample data', subscriberId:'sample data', groupType:'sample data', paymentForIndividual:'sample data', itemCount:1234}

      ];
      service.getStagePremPayHeaderSupports().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheadersupports/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePremPayHeaderSupport);
    });
  });


  describe('#createStagePremPayHeaderSupport', () => {
    var id = 1;
    it('should return an Promise<StagePremPayHeaderSupport>', () => {
      const stagePremPayHeaderSupport: StagePremPayHeaderSupport = {batchId:'sample data', transactionId:1234, seqGroupId:1234, groupId:'sample data', subscriberId:'sample data', groupType:'sample data', paymentForIndividual:'sample data', itemCount:1234};
      service.createStagePremPayHeaderSupport(stagePremPayHeaderSupport).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheadersupports`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePremPayHeaderSupport', () => {
    var id = 1;
    it('should return an Promise<StagePremPayHeaderSupport>', () => {
      const stagePremPayHeaderSupport: StagePremPayHeaderSupport = {batchId:'sample data', transactionId:1234, seqGroupId:1234, groupId:'sample data', subscriberId:'sample data', groupType:'sample data', paymentForIndividual:'sample data', itemCount:1234};
      service.updateStagePremPayHeaderSupport(stagePremPayHeaderSupport, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheadersupports/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePremPayHeaderSupport', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePremPayHeaderSupport(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageprempayheadersupports/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});