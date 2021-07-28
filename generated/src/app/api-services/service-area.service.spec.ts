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

import { ServiceAreaService } from './service-area.service';
import { ServiceArea } from '../api-models/service-area.model'
import { ServiceAreas } from "../api-models/testing/fake-service-area.model"

describe('ServiceAreaService', () => {
  let injector: TestBed;
  let service: ServiceAreaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceAreaService]
    });
    injector = getTestBed();
    service = injector.get(ServiceAreaService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getServiceAreas', () => {
    it('should return an Promise<ServiceArea[]>', () => {
      const serviceArea = [
       {serviceAreaName:'sample data', serviceAreaDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {serviceAreaName:'sample data', serviceAreaDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {serviceAreaName:'sample data', serviceAreaDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getServiceAreas().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareas/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(serviceArea);
    });
  });


  describe('#createServiceArea', () => {
    var id = 1;
    it('should return an Promise<ServiceArea>', () => {
      const serviceArea: ServiceArea = {serviceAreaName:'sample data', serviceAreaDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createServiceArea(serviceArea).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareas`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateServiceArea', () => {
    var id = 1;
    it('should return an Promise<ServiceArea>', () => {
      const serviceArea: ServiceArea = {serviceAreaName:'sample data', serviceAreaDescription:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateServiceArea(serviceArea, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareas/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteServiceArea', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteServiceArea(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/serviceareas/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});