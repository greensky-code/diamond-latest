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

import { ReleaseHoldJobSetupService } from './release-hold-job-setup.service';
import { ReleaseHoldJobSetup } from '../api-models/release-hold-job-setup.model'
import { ReleaseHoldJobSetups } from "../api-models/testing/fake-release-hold-job-setup.model"

describe('ReleaseHoldJobSetupService', () => {
  let injector: TestBed;
  let service: ReleaseHoldJobSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReleaseHoldJobSetupService]
    });
    injector = getTestBed();
    service = injector.get(ReleaseHoldJobSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getReleaseHoldJobSetups', () => {
    it('should return an Promise<ReleaseHoldJobSetup[]>', () => {
      const releaseHoldJobSetup = [
       {keyword:'sample data', seqRhjobId:1234, jobId:'sample data', seqRuleId:1234, releaseFromDate:'2018-01-01', releaseThruDate:'2018-01-01', applyHeaderHoldsFlag:'sample data', dateTypeCode:'sample data', statusCode:1234, actionCode:1234, claimsSelected:1234, claimsProcessed:1234, requestDate:'2018-01-01', requestUser:'sample data', templateFlag:'sample data', requestTypeCode:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRhjobId:1234, jobId:'sample data', seqRuleId:1234, releaseFromDate:'2018-01-01', releaseThruDate:'2018-01-01', applyHeaderHoldsFlag:'sample data', dateTypeCode:'sample data', statusCode:1234, actionCode:1234, claimsSelected:1234, claimsProcessed:1234, requestDate:'2018-01-01', requestUser:'sample data', templateFlag:'sample data', requestTypeCode:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {keyword:'sample data', seqRhjobId:1234, jobId:'sample data', seqRuleId:1234, releaseFromDate:'2018-01-01', releaseThruDate:'2018-01-01', applyHeaderHoldsFlag:'sample data', dateTypeCode:'sample data', statusCode:1234, actionCode:1234, claimsSelected:1234, claimsProcessed:1234, requestDate:'2018-01-01', requestUser:'sample data', templateFlag:'sample data', requestTypeCode:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getReleaseHoldJobSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/releaseholdjobsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(releaseHoldJobSetup);
    });
  });


  describe('#createReleaseHoldJobSetup', () => {
    var id = 1;
    it('should return an Promise<ReleaseHoldJobSetup>', () => {
      const releaseHoldJobSetup: ReleaseHoldJobSetup = {keyword:'sample data', seqRhjobId:1234, jobId:'sample data', seqRuleId:1234, releaseFromDate:'2018-01-01', releaseThruDate:'2018-01-01', applyHeaderHoldsFlag:'sample data', dateTypeCode:'sample data', statusCode:1234, actionCode:1234, claimsSelected:1234, claimsProcessed:1234, requestDate:'2018-01-01', requestUser:'sample data', templateFlag:'sample data', requestTypeCode:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createReleaseHoldJobSetup(releaseHoldJobSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/releaseholdjobsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateReleaseHoldJobSetup', () => {
    var id = 1;
    it('should return an Promise<ReleaseHoldJobSetup>', () => {
      const releaseHoldJobSetup: ReleaseHoldJobSetup = {keyword:'sample data', seqRhjobId:1234, jobId:'sample data', seqRuleId:1234, releaseFromDate:'2018-01-01', releaseThruDate:'2018-01-01', applyHeaderHoldsFlag:'sample data', dateTypeCode:'sample data', statusCode:1234, actionCode:1234, claimsSelected:1234, claimsProcessed:1234, requestDate:'2018-01-01', requestUser:'sample data', templateFlag:'sample data', requestTypeCode:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateReleaseHoldJobSetup(releaseHoldJobSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/releaseholdjobsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteReleaseHoldJobSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteReleaseHoldJobSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/releaseholdjobsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});