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

import { SmconfigurationService } from './smconfiguration.service';
import { Smconfiguration } from '../api-models/smconfiguration.model'
import { Smconfigurations } from "../api-models/testing/fake-smconfiguration.model"

describe('SmconfigurationService', () => {
  let injector: TestBed;
  let service: SmconfigurationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmconfigurationService]
    });
    injector = getTestBed();
    service = injector.get(SmconfigurationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmconfigurations', () => {
    it('should return an Promise<Smconfiguration[]>', () => {
      const smconfiguration = [
       {attribute:'sample data', value:'sample data'},
       {attribute:'sample data', value:'sample data'},
       {attribute:'sample data', value:'sample data'}

      ];
      service.getSmconfigurations().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smconfigurations/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smconfiguration);
    });
  });


  describe('#createSmconfiguration', () => {
    var id = 1;
    it('should return an Promise<Smconfiguration>', () => {
      const smconfiguration: Smconfiguration = {attribute:'sample data', value:'sample data'};
      service.createSmconfiguration(smconfiguration).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smconfigurations`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmconfiguration', () => {
    var id = 1;
    it('should return an Promise<Smconfiguration>', () => {
      const smconfiguration: Smconfiguration = {attribute:'sample data', value:'sample data'};
      service.updateSmconfiguration(smconfiguration, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smconfigurations/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmconfiguration', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmconfiguration(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smconfigurations/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});