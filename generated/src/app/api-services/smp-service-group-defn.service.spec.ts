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

import { SmpServiceGroupDefnService } from './smp-service-group-defn.service';
import { SmpServiceGroupDefn } from '../api-models/smp-service-group-defn.model'
import { SmpServiceGroupDefns } from "../api-models/testing/fake-smp-service-group-defn.model"

describe('SmpServiceGroupDefnService', () => {
  let injector: TestBed;
  let service: SmpServiceGroupDefnService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpServiceGroupDefnService]
    });
    injector = getTestBed();
    service = injector.get(SmpServiceGroupDefnService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpServiceGroupDefns', () => {
    it('should return an Promise<SmpServiceGroupDefn[]>', () => {
      const smpServiceGroupDefn = [
       {owner:'sample data', groupName:'sample data', groupType:1234},
       {owner:'sample data', groupName:'sample data', groupType:1234},
       {owner:'sample data', groupName:'sample data', groupType:1234}

      ];
      service.getSmpServiceGroupDefns().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupdefns/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpServiceGroupDefn);
    });
  });


  describe('#createSmpServiceGroupDefn', () => {
    var id = 1;
    it('should return an Promise<SmpServiceGroupDefn>', () => {
      const smpServiceGroupDefn: SmpServiceGroupDefn = {owner:'sample data', groupName:'sample data', groupType:1234};
      service.createSmpServiceGroupDefn(smpServiceGroupDefn).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupdefns`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpServiceGroupDefn', () => {
    var id = 1;
    it('should return an Promise<SmpServiceGroupDefn>', () => {
      const smpServiceGroupDefn: SmpServiceGroupDefn = {owner:'sample data', groupName:'sample data', groupType:1234};
      service.updateSmpServiceGroupDefn(smpServiceGroupDefn, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupdefns/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpServiceGroupDefn', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpServiceGroupDefn(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpservicegroupdefns/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});