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

import { PmbSetupService } from './pmb-setup.service';
import { PmbSetup } from '../api-models/pmb-setup.model'
import { PmbSetups } from "../api-models/testing/fake-pmb-setup.model"

describe('PmbSetupService', () => {
  let injector: TestBed;
  let service: PmbSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSetupService]
    });
    injector = getTestBed();
    service = injector.get(PmbSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSetups', () => {
    it('should return an Promise<PmbSetup[]>', () => {
      const pmbSetup = [
       {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billThruRequestDate:'2018-01-01', billingType:'sample data', billJobType:'sample data', billingCycle:'sample data', postDate:'2018-01-01', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'},
       {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billThruRequestDate:'2018-01-01', billingType:'sample data', billJobType:'sample data', billingCycle:'sample data', postDate:'2018-01-01', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'},
       {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billThruRequestDate:'2018-01-01', billingType:'sample data', billJobType:'sample data', billingCycle:'sample data', postDate:'2018-01-01', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'}

      ];
      service.getPmbSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSetup);
    });
  });


  describe('#createPmbSetup', () => {
    var id = 1;
    it('should return an Promise<PmbSetup>', () => {
      const pmbSetup: PmbSetup = {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billThruRequestDate:'2018-01-01', billingType:'sample data', billJobType:'sample data', billingCycle:'sample data', postDate:'2018-01-01', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'};
      service.createPmbSetup(pmbSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSetup', () => {
    var id = 1;
    it('should return an Promise<PmbSetup>', () => {
      const pmbSetup: PmbSetup = {seqGpbilId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', requestType:'sample data', action:'sample data', billThruRequestDate:'2018-01-01', billingType:'sample data', billJobType:'sample data', billingCycle:'sample data', postDate:'2018-01-01', template:'sample data', daemonRequest:'sample data', status:'sample data', comments:'sample data', inProcess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', subscFlag:'sample data'};
      service.updatePmbSetup(pmbSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});