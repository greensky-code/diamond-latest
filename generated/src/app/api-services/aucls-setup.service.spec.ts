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

import { AuclsSetupService } from './aucls-setup.service';
import { AuclsSetup } from '../api-models/aucls-setup.model'
import { AuclsSetups } from "../api-models/testing/fake-aucls-setup.model"

describe('AuclsSetupService', () => {
  let injector: TestBed;
  let service: AuclsSetupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuclsSetupService]
    });
    injector = getTestBed();
    service = injector.get(AuclsSetupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuclsSetups', () => {
    it('should return an Promise<AuclsSetup[]>', () => {
      const auclsSetup = [
       {seqAuclsJobId:'sample data', description:'sample data', comments:'sample data', jobRunOptionCode:1234, jobActionCode:1234, jobStatusCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuclsJobId:'sample data', description:'sample data', comments:'sample data', jobRunOptionCode:1234, jobActionCode:1234, jobStatusCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqAuclsJobId:'sample data', description:'sample data', comments:'sample data', jobRunOptionCode:1234, jobActionCode:1234, jobStatusCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuclsSetups().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auclssetups/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auclsSetup);
    });
  });


  describe('#createAuclsSetup', () => {
    var id = 1;
    it('should return an Promise<AuclsSetup>', () => {
      const auclsSetup: AuclsSetup = {seqAuclsJobId:'sample data', description:'sample data', comments:'sample data', jobRunOptionCode:1234, jobActionCode:1234, jobStatusCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createAuclsSetup(auclsSetup).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclssetups`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuclsSetup', () => {
    var id = 1;
    it('should return an Promise<AuclsSetup>', () => {
      const auclsSetup: AuclsSetup = {seqAuclsJobId:'sample data', description:'sample data', comments:'sample data', jobRunOptionCode:1234, jobActionCode:1234, jobStatusCode:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateAuclsSetup(auclsSetup, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclssetups/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuclsSetup', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuclsSetup(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auclssetups/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});