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

import { SmpAdParmsService } from './smp-ad-parms.service';
import { SmpAdParms } from '../api-models/smp-ad-parms.model'
import { SmpAdParmss } from "../api-models/testing/fake-smp-ad-parms.model"

describe('SmpAdParmsService', () => {
  let injector: TestBed;
  let service: SmpAdParmsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpAdParmsService]
    });
    injector = getTestBed();
    service = injector.get(SmpAdParmsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpAdParmss', () => {
    it('should return an Promise<SmpAdParms[]>', () => {
      const smpAdParms = [
       {owner:'sample data', backgroundDiscovery:1234, backgroundFrequency:1234},
       {owner:'sample data', backgroundDiscovery:1234, backgroundFrequency:1234},
       {owner:'sample data', backgroundDiscovery:1234, backgroundFrequency:1234}

      ];
      service.getSmpAdParmss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpadparmss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpAdParms);
    });
  });


  describe('#createSmpAdParms', () => {
    var id = 1;
    it('should return an Promise<SmpAdParms>', () => {
      const smpAdParms: SmpAdParms = {owner:'sample data', backgroundDiscovery:1234, backgroundFrequency:1234};
      service.createSmpAdParms(smpAdParms).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadparmss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpAdParms', () => {
    var id = 1;
    it('should return an Promise<SmpAdParms>', () => {
      const smpAdParms: SmpAdParms = {owner:'sample data', backgroundDiscovery:1234, backgroundFrequency:1234};
      service.updateSmpAdParms(smpAdParms, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadparmss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpAdParms', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpAdParms(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadparmss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});