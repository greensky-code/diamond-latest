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

import { ProcCheckPayerPlatformService } from './proc-check-payer-platform.service';
import { ProcCheckPayerPlatform } from '../api-models/proc-check-payer-platform.model'
import { ProcCheckPayerPlatforms } from "../api-models/testing/fake-proc-check-payer-platform.model"

describe('ProcCheckPayerPlatformService', () => {
  let injector: TestBed;
  let service: ProcCheckPayerPlatformService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCheckPayerPlatformService]
    });
    injector = getTestBed();
    service = injector.get(ProcCheckPayerPlatformService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCheckPayerPlatforms', () => {
    it('should return an Promise<ProcCheckPayerPlatform[]>', () => {
      const procCheckPayerPlatform = [
       {pSeqGroupId:1234, pDisplay:'sample data', pStartDateFlag:'sample data'},
       {pSeqGroupId:1234, pDisplay:'sample data', pStartDateFlag:'sample data'},
       {pSeqGroupId:1234, pDisplay:'sample data', pStartDateFlag:'sample data'}

      ];
      service.getProcCheckPayerPlatforms().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckpayerplatforms/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCheckPayerPlatform);
    });
  });


  describe('#createProcCheckPayerPlatform', () => {
    var id = 1;
    it('should return an Promise<ProcCheckPayerPlatform>', () => {
      const procCheckPayerPlatform: ProcCheckPayerPlatform = {pSeqGroupId:1234, pDisplay:'sample data', pStartDateFlag:'sample data'};
      service.createProcCheckPayerPlatform(procCheckPayerPlatform).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckpayerplatforms`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCheckPayerPlatform', () => {
    var id = 1;
    it('should return an Promise<ProcCheckPayerPlatform>', () => {
      const procCheckPayerPlatform: ProcCheckPayerPlatform = {pSeqGroupId:1234, pDisplay:'sample data', pStartDateFlag:'sample data'};
      service.updateProcCheckPayerPlatform(procCheckPayerPlatform, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckpayerplatforms/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCheckPayerPlatform', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCheckPayerPlatform(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccheckpayerplatforms/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});