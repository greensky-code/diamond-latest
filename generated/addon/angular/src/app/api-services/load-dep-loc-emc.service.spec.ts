/* Copyright (c) 2021 . All Rights Reserved. */

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

import { LoadDepLocEmcService } from './load-dep-loc-emc.service';
import { LoadDepLocEmc } from '../api-models/load-dep-loc-emc.model'
import { LoadDepLocEmcs } from "../api-models/testing/fake-load-dep-loc-emc.model"

describe('LoadDepLocEmcService', () => {
  let injector: TestBed;
  let service: LoadDepLocEmcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadDepLocEmcService]
    });
    injector = getTestBed();
    service = injector.get(LoadDepLocEmcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLoadDepLocEmcs', () => {
    it('should return an Promise<LoadDepLocEmc[]>', () => {
      const loadDepLocEmc = [
       {pSeqEntityId:1234, pEntityCode:'sample data', pSubworkloc:'sample data', pEmiratecd:'sample data'},
       {pSeqEntityId:1234, pEntityCode:'sample data', pSubworkloc:'sample data', pEmiratecd:'sample data'},
       {pSeqEntityId:1234, pEntityCode:'sample data', pSubworkloc:'sample data', pEmiratecd:'sample data'}

      ];
      service.getLoadDepLocEmcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/loaddeplocemcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(loadDepLocEmc);
    });
  });


  describe('#createLoadDepLocEmc', () => {
    var id = 1;
    it('should return an Promise<LoadDepLocEmc>', () => {
      const loadDepLocEmc: LoadDepLocEmc = {pSeqEntityId:1234, pEntityCode:'sample data', pSubworkloc:'sample data', pEmiratecd:'sample data'};
      service.createLoadDepLocEmc(loadDepLocEmc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loaddeplocemcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLoadDepLocEmc', () => {
    var id = 1;
    it('should return an Promise<LoadDepLocEmc>', () => {
      const loadDepLocEmc: LoadDepLocEmc = {pSeqEntityId:1234, pEntityCode:'sample data', pSubworkloc:'sample data', pEmiratecd:'sample data'};
      service.updateLoadDepLocEmc(loadDepLocEmc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loaddeplocemcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLoadDepLocEmc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLoadDepLocEmc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loaddeplocemcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});