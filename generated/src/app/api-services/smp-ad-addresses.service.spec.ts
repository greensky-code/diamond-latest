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

import { SmpAdAddressesService } from './smp-ad-addresses.service';
import { SmpAdAddresses } from '../api-models/smp-ad-addresses.model'
import { SmpAdAddresseses } from "../api-models/testing/fake-smp-ad-addresses.model"

describe('SmpAdAddressesService', () => {
  let injector: TestBed;
  let service: SmpAdAddressesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpAdAddressesService]
    });
    injector = getTestBed();
    service = injector.get(SmpAdAddressesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpAdAddresseses', () => {
    it('should return an Promise<SmpAdAddresses[]>', () => {
      const smpAdAddresses = [
       {owner:'sample data', node:'sample data', alias:'sample data', address:'sample data'},
       {owner:'sample data', node:'sample data', alias:'sample data', address:'sample data'},
       {owner:'sample data', node:'sample data', alias:'sample data', address:'sample data'}

      ];
      service.getSmpAdAddresseses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpadaddresseses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpAdAddresses);
    });
  });


  describe('#createSmpAdAddresses', () => {
    var id = 1;
    it('should return an Promise<SmpAdAddresses>', () => {
      const smpAdAddresses: SmpAdAddresses = {owner:'sample data', node:'sample data', alias:'sample data', address:'sample data'};
      service.createSmpAdAddresses(smpAdAddresses).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadaddresseses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpAdAddresses', () => {
    var id = 1;
    it('should return an Promise<SmpAdAddresses>', () => {
      const smpAdAddresses: SmpAdAddresses = {owner:'sample data', node:'sample data', alias:'sample data', address:'sample data'};
      service.updateSmpAdAddresses(smpAdAddresses, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadaddresseses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpAdAddresses', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpAdAddresses(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadaddresseses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});