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

import { ServiceAreaPostCdService } from './service-area-post-cd.service';
import { ServiceAreaPostCd } from '../api-models/service-area-post-cd.model'
import { ServiceAreaPostCds } from "../api-models/testing/fake-service-area-post-cd.model"

describe('ServiceAreaPostCdService', () => {
  let injector: TestBed;
  let service: ServiceAreaPostCdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceAreaPostCdService]
    });
    injector = getTestBed();
    service = injector.get(ServiceAreaPostCdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getServiceAreaPostCds', () => {
    it('should return an Promise<ServiceAreaPostCd[]>', () => {
      const serviceAreaPostCd = [
       {serviceAreaName:'sample data', seqPostCode:1234, fromPostCode:'sample data', thruPostCode:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {serviceAreaName:'sample data', seqPostCode:1234, fromPostCode:'sample data', thruPostCode:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {serviceAreaName:'sample data', seqPostCode:1234, fromPostCode:'sample data', thruPostCode:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getServiceAreaPostCds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareapostcds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(serviceAreaPostCd);
    });
  });


  describe('#createServiceAreaPostCd', () => {
    var id = 1;
    it('should return an Promise<ServiceAreaPostCd>', () => {
      const serviceAreaPostCd: ServiceAreaPostCd = {serviceAreaName:'sample data', seqPostCode:1234, fromPostCode:'sample data', thruPostCode:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createServiceAreaPostCd(serviceAreaPostCd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareapostcds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateServiceAreaPostCd', () => {
    var id = 1;
    it('should return an Promise<ServiceAreaPostCd>', () => {
      const serviceAreaPostCd: ServiceAreaPostCd = {serviceAreaName:'sample data', seqPostCode:1234, fromPostCode:'sample data', thruPostCode:'sample data', operator:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateServiceAreaPostCd(serviceAreaPostCd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareapostcds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteServiceAreaPostCd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteServiceAreaPostCd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareapostcds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});