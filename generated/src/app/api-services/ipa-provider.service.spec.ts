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

import { IpaProviderService } from './ipa-provider.service';
import { IpaProvider } from '../api-models/ipa-provider.model'
import { IpaProviders } from "../api-models/testing/fake-ipa-provider.model"

describe('IpaProviderService', () => {
  let injector: TestBed;
  let service: IpaProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaProviderService]
    });
    injector = getTestBed();
    service = injector.get(IpaProviderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaProviders', () => {
    it('should return an Promise<IpaProvider[]>', () => {
      const ipaProvider = [
       {ipaId:'sample data', ipaProvCategory:'sample data', effectiveDate:'2018-01-01', seqProvId:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', contractInHouseFlag:'sample data'},
       {ipaId:'sample data', ipaProvCategory:'sample data', effectiveDate:'2018-01-01', seqProvId:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', contractInHouseFlag:'sample data'},
       {ipaId:'sample data', ipaProvCategory:'sample data', effectiveDate:'2018-01-01', seqProvId:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', contractInHouseFlag:'sample data'}

      ];
      service.getIpaProviders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipaproviders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaProvider);
    });
  });


  describe('#createIpaProvider', () => {
    var id = 1;
    it('should return an Promise<IpaProvider>', () => {
      const ipaProvider: IpaProvider = {ipaId:'sample data', ipaProvCategory:'sample data', effectiveDate:'2018-01-01', seqProvId:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', contractInHouseFlag:'sample data'};
      service.createIpaProvider(ipaProvider).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaproviders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaProvider', () => {
    var id = 1;
    it('should return an Promise<IpaProvider>', () => {
      const ipaProvider: IpaProvider = {ipaId:'sample data', ipaProvCategory:'sample data', effectiveDate:'2018-01-01', seqProvId:1234, termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', contractInHouseFlag:'sample data'};
      service.updateIpaProvider(ipaProvider, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaproviders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaProvider', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaProvider(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaproviders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});