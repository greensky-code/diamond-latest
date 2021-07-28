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

import { CapRateHeaderRetroService } from './cap-rate-header-retro.service';
import { CapRateHeaderRetro } from '../api-models/cap-rate-header-retro.model'
import { CapRateHeaderRetroes } from "../api-models/testing/fake-cap-rate-header-retro.model"

describe('CapRateHeaderRetroService', () => {
  let injector: TestBed;
  let service: CapRateHeaderRetroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapRateHeaderRetroService]
    });
    injector = getTestBed();
    service = injector.get(CapRateHeaderRetroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapRateHeaderRetroes', () => {
    it('should return an Promise<CapRateHeaderRetro[]>', () => {
      const capRateHeaderRetro = [
       {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data'},
       {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data'},
       {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data'}

      ];
      service.getCapRateHeaderRetroes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaderretroes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capRateHeaderRetro);
    });
  });


  describe('#createCapRateHeaderRetro', () => {
    var id = 1;
    it('should return an Promise<CapRateHeaderRetro>', () => {
      const capRateHeaderRetro: CapRateHeaderRetro = {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data'};
      service.createCapRateHeaderRetro(capRateHeaderRetro).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaderretroes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapRateHeaderRetro', () => {
    var id = 1;
    it('should return an Promise<CapRateHeaderRetro>', () => {
      const capRateHeaderRetro: CapRateHeaderRetro = {seqCapRateHdr:1234, capModelId:'sample data', capRateId:'sample data', detValue1:'sample data', detValue2:'sample data', detValue3:'sample data'};
      service.updateCapRateHeaderRetro(capRateHeaderRetro, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaderretroes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapRateHeaderRetro', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapRateHeaderRetro(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/caprateheaderretroes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});