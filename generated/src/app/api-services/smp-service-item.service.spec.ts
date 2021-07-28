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

import { SmpServiceItemService } from './smp-service-item.service';
import { SmpServiceItem } from '../api-models/smp-service-item.model'
import { SmpServiceItems } from "../api-models/testing/fake-smp-service-item.model"

describe('SmpServiceItemService', () => {
  let injector: TestBed;
  let service: SmpServiceItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpServiceItemService]
    });
    injector = getTestBed();
    service = injector.get(SmpServiceItemService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpServiceItems', () => {
    it('should return an Promise<SmpServiceItem[]>', () => {
      const smpServiceItem = [
       {owner:'sample data', serviceName:'sample data', serviceType:1234, node:'sample data', listenerList:'sample data', opsname:'sample data'},
       {owner:'sample data', serviceName:'sample data', serviceType:1234, node:'sample data', listenerList:'sample data', opsname:'sample data'},
       {owner:'sample data', serviceName:'sample data', serviceType:1234, node:'sample data', listenerList:'sample data', opsname:'sample data'}

      ];
      service.getSmpServiceItems().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpserviceitems/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpServiceItem);
    });
  });


  describe('#createSmpServiceItem', () => {
    var id = 1;
    it('should return an Promise<SmpServiceItem>', () => {
      const smpServiceItem: SmpServiceItem = {owner:'sample data', serviceName:'sample data', serviceType:1234, node:'sample data', listenerList:'sample data', opsname:'sample data'};
      service.createSmpServiceItem(smpServiceItem).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpserviceitems`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpServiceItem', () => {
    var id = 1;
    it('should return an Promise<SmpServiceItem>', () => {
      const smpServiceItem: SmpServiceItem = {owner:'sample data', serviceName:'sample data', serviceType:1234, node:'sample data', listenerList:'sample data', opsname:'sample data'};
      service.updateSmpServiceItem(smpServiceItem, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpserviceitems/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpServiceItem', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpServiceItem(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpserviceitems/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});