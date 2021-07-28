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

import { SmpServiceDataService } from './smp-service-data.service';
import { SmpServiceData } from '../api-models/smp-service-data.model'
import { SmpServiceDatas } from "../api-models/testing/fake-smp-service-data.model"

describe('SmpServiceDataService', () => {
  let injector: TestBed;
  let service: SmpServiceDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpServiceDataService]
    });
    injector = getTestBed();
    service = injector.get(SmpServiceDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpServiceDatas', () => {
    it('should return an Promise<SmpServiceData[]>', () => {
      const smpServiceData = [
       {owner:'sample data', serviceName:'sample data', serviceType:'sample data', node:'sample data', data:'sample data'},
       {owner:'sample data', serviceName:'sample data', serviceType:'sample data', node:'sample data', data:'sample data'},
       {owner:'sample data', serviceName:'sample data', serviceType:'sample data', node:'sample data', data:'sample data'}

      ];
      service.getSmpServiceDatas().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicedatas/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpServiceData);
    });
  });


  describe('#createSmpServiceData', () => {
    var id = 1;
    it('should return an Promise<SmpServiceData>', () => {
      const smpServiceData: SmpServiceData = {owner:'sample data', serviceName:'sample data', serviceType:'sample data', node:'sample data', data:'sample data'};
      service.createSmpServiceData(smpServiceData).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicedatas`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpServiceData', () => {
    var id = 1;
    it('should return an Promise<SmpServiceData>', () => {
      const smpServiceData: SmpServiceData = {owner:'sample data', serviceName:'sample data', serviceType:'sample data', node:'sample data', data:'sample data'};
      service.updateSmpServiceData(smpServiceData, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicedatas/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpServiceData', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpServiceData(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicedatas/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});