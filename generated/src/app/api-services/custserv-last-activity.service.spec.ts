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

import { CustservLastActivityService } from './custserv-last-activity.service';
import { CustservLastActivity } from '../api-models/custserv-last-activity.model'
import { CustservLastActivitys } from "../api-models/testing/fake-custserv-last-activity.model"

describe('CustservLastActivityService', () => {
  let injector: TestBed;
  let service: CustservLastActivityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustservLastActivityService]
    });
    injector = getTestBed();
    service = injector.get(CustservLastActivityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCustservLastActivitys', () => {
    it('should return an Promise<CustservLastActivity[]>', () => {
      const custservLastActivity = [
       {claimsUpdateDate:'2018-01-01', claimsAdjUpdateDate:'2018-01-01', authUpdateDate:'2018-01-01', demographicsUpdateDate:'2018-01-01', pcpUpdateDate:'2018-01-01', terminateUpdateDate:'2018-01-01', reinstateUpdateDate:'2018-01-01', idCardUpdateDate:'2018-01-01', letterUpdateDate:'2018-01-01', seqMembId:1234},
       {claimsUpdateDate:'2018-01-01', claimsAdjUpdateDate:'2018-01-01', authUpdateDate:'2018-01-01', demographicsUpdateDate:'2018-01-01', pcpUpdateDate:'2018-01-01', terminateUpdateDate:'2018-01-01', reinstateUpdateDate:'2018-01-01', idCardUpdateDate:'2018-01-01', letterUpdateDate:'2018-01-01', seqMembId:1234},
       {claimsUpdateDate:'2018-01-01', claimsAdjUpdateDate:'2018-01-01', authUpdateDate:'2018-01-01', demographicsUpdateDate:'2018-01-01', pcpUpdateDate:'2018-01-01', terminateUpdateDate:'2018-01-01', reinstateUpdateDate:'2018-01-01', idCardUpdateDate:'2018-01-01', letterUpdateDate:'2018-01-01', seqMembId:1234}

      ];
      service.getCustservLastActivitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/custservlastactivitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(custservLastActivity);
    });
  });


  describe('#createCustservLastActivity', () => {
    var id = 1;
    it('should return an Promise<CustservLastActivity>', () => {
      const custservLastActivity: CustservLastActivity = {claimsUpdateDate:'2018-01-01', claimsAdjUpdateDate:'2018-01-01', authUpdateDate:'2018-01-01', demographicsUpdateDate:'2018-01-01', pcpUpdateDate:'2018-01-01', terminateUpdateDate:'2018-01-01', reinstateUpdateDate:'2018-01-01', idCardUpdateDate:'2018-01-01', letterUpdateDate:'2018-01-01', seqMembId:1234};
      service.createCustservLastActivity(custservLastActivity).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/custservlastactivitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCustservLastActivity', () => {
    var id = 1;
    it('should return an Promise<CustservLastActivity>', () => {
      const custservLastActivity: CustservLastActivity = {claimsUpdateDate:'2018-01-01', claimsAdjUpdateDate:'2018-01-01', authUpdateDate:'2018-01-01', demographicsUpdateDate:'2018-01-01', pcpUpdateDate:'2018-01-01', terminateUpdateDate:'2018-01-01', reinstateUpdateDate:'2018-01-01', idCardUpdateDate:'2018-01-01', letterUpdateDate:'2018-01-01', seqMembId:1234};
      service.updateCustservLastActivity(custservLastActivity, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/custservlastactivitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCustservLastActivity', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCustservLastActivity(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/custservlastactivitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});