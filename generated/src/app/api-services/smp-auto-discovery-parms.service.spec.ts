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

import { SmpAutoDiscoveryParmsService } from './smp-auto-discovery-parms.service';
import { SmpAutoDiscoveryParms } from '../api-models/smp-auto-discovery-parms.model'
import { SmpAutoDiscoveryParmss } from "../api-models/testing/fake-smp-auto-discovery-parms.model"

describe('SmpAutoDiscoveryParmsService', () => {
  let injector: TestBed;
  let service: SmpAutoDiscoveryParmsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpAutoDiscoveryParmsService]
    });
    injector = getTestBed();
    service = injector.get(SmpAutoDiscoveryParmsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpAutoDiscoveryParmss', () => {
    it('should return an Promise<SmpAutoDiscoveryParms[]>', () => {
      const smpAutoDiscoveryParms = [
       {owner:'sample data', adFrequency:1234, adConnTimeout:1234, adUpdateFrequency:1234, adUpdateCount:1234, adEnable:1234},
       {owner:'sample data', adFrequency:1234, adConnTimeout:1234, adUpdateFrequency:1234, adUpdateCount:1234, adEnable:1234},
       {owner:'sample data', adFrequency:1234, adConnTimeout:1234, adUpdateFrequency:1234, adUpdateCount:1234, adEnable:1234}

      ];
      service.getSmpAutoDiscoveryParmss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryparmss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpAutoDiscoveryParms);
    });
  });


  describe('#createSmpAutoDiscoveryParms', () => {
    var id = 1;
    it('should return an Promise<SmpAutoDiscoveryParms>', () => {
      const smpAutoDiscoveryParms: SmpAutoDiscoveryParms = {owner:'sample data', adFrequency:1234, adConnTimeout:1234, adUpdateFrequency:1234, adUpdateCount:1234, adEnable:1234};
      service.createSmpAutoDiscoveryParms(smpAutoDiscoveryParms).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryparmss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpAutoDiscoveryParms', () => {
    var id = 1;
    it('should return an Promise<SmpAutoDiscoveryParms>', () => {
      const smpAutoDiscoveryParms: SmpAutoDiscoveryParms = {owner:'sample data', adFrequency:1234, adConnTimeout:1234, adUpdateFrequency:1234, adUpdateCount:1234, adEnable:1234};
      service.updateSmpAutoDiscoveryParms(smpAutoDiscoveryParms, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryparmss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpAutoDiscoveryParms', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpAutoDiscoveryParms(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryparmss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});