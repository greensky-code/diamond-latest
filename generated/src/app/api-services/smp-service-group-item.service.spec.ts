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

import { SmpServiceGroupItemService } from './smp-service-group-item.service';
import { SmpServiceGroupItem } from '../api-models/smp-service-group-item.model'
import { SmpServiceGroupItems } from "../api-models/testing/fake-smp-service-group-item.model"

describe('SmpServiceGroupItemService', () => {
  let injector: TestBed;
  let service: SmpServiceGroupItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpServiceGroupItemService]
    });
    injector = getTestBed();
    service = injector.get(SmpServiceGroupItemService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpServiceGroupItems', () => {
    it('should return an Promise<SmpServiceGroupItem[]>', () => {
      const smpServiceGroupItem = [
       {owner:'sample data', groupName:'sample data', objectName:'sample data', objectType:1234, isagroup:'sample data'},
       {owner:'sample data', groupName:'sample data', objectName:'sample data', objectType:1234, isagroup:'sample data'},
       {owner:'sample data', groupName:'sample data', objectName:'sample data', objectType:1234, isagroup:'sample data'}

      ];
      service.getSmpServiceGroupItems().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupitems/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpServiceGroupItem);
    });
  });


  describe('#createSmpServiceGroupItem', () => {
    var id = 1;
    it('should return an Promise<SmpServiceGroupItem>', () => {
      const smpServiceGroupItem: SmpServiceGroupItem = {owner:'sample data', groupName:'sample data', objectName:'sample data', objectType:1234, isagroup:'sample data'};
      service.createSmpServiceGroupItem(smpServiceGroupItem).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupitems`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpServiceGroupItem', () => {
    var id = 1;
    it('should return an Promise<SmpServiceGroupItem>', () => {
      const smpServiceGroupItem: SmpServiceGroupItem = {owner:'sample data', groupName:'sample data', objectName:'sample data', objectType:1234, isagroup:'sample data'};
      service.updateSmpServiceGroupItem(smpServiceGroupItem, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupitems/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpServiceGroupItem', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpServiceGroupItem(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupitems/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});