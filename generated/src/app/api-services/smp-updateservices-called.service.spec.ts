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

import { SmpUpdateservicesCalledService } from './smp-updateservices-called.service';
import { SmpUpdateservicesCalled } from '../api-models/smp-updateservices-called.model'
import { SmpUpdateservicesCalleds } from "../api-models/testing/fake-smp-updateservices-called.model"

describe('SmpUpdateservicesCalledService', () => {
  let injector: TestBed;
  let service: SmpUpdateservicesCalledService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpUpdateservicesCalledService]
    });
    injector = getTestBed();
    service = injector.get(SmpUpdateservicesCalledService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpUpdateservicesCalleds', () => {
    it('should return an Promise<SmpUpdateservicesCalled[]>', () => {
      const smpUpdateservicesCalled = [
       {owner:'sample data', called:1234},
       {owner:'sample data', called:1234},
       {owner:'sample data', called:1234}

      ];
      service.getSmpUpdateservicesCalleds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpupdateservicescalleds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpUpdateservicesCalled);
    });
  });


  describe('#createSmpUpdateservicesCalled', () => {
    var id = 1;
    it('should return an Promise<SmpUpdateservicesCalled>', () => {
      const smpUpdateservicesCalled: SmpUpdateservicesCalled = {owner:'sample data', called:1234};
      service.createSmpUpdateservicesCalled(smpUpdateservicesCalled).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpupdateservicescalleds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpUpdateservicesCalled', () => {
    var id = 1;
    it('should return an Promise<SmpUpdateservicesCalled>', () => {
      const smpUpdateservicesCalled: SmpUpdateservicesCalled = {owner:'sample data', called:1234};
      service.updateSmpUpdateservicesCalled(smpUpdateservicesCalled, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpupdateservicescalleds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpUpdateservicesCalled', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpUpdateservicesCalled(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpupdateservicescalleds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});