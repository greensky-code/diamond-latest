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

import { ProcPayerOopDedService } from './proc-payer-oop-ded.service';
import { ProcPayerOopDed } from '../api-models/proc-payer-oop-ded.model'
import { ProcPayerOopDeds } from "../api-models/testing/fake-proc-payer-oop-ded.model"

describe('ProcPayerOopDedService', () => {
  let injector: TestBed;
  let service: ProcPayerOopDedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcPayerOopDedService]
    });
    injector = getTestBed();
    service = injector.get(ProcPayerOopDedService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcPayerOopDeds', () => {
    it('should return an Promise<ProcPayerOopDed[]>', () => {
      const procPayerOopDed = [
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'}

      ];
      service.getProcPayerOopDeds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procpayeroopdeds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procPayerOopDed);
    });
  });


  describe('#createProcPayerOopDed', () => {
    var id = 1;
    it('should return an Promise<ProcPayerOopDed>', () => {
      const procPayerOopDed: ProcPayerOopDed = {pRetcode:1234, pRetmsg:'sample data'};
      service.createProcPayerOopDed(procPayerOopDed).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayeroopdeds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcPayerOopDed', () => {
    var id = 1;
    it('should return an Promise<ProcPayerOopDed>', () => {
      const procPayerOopDed: ProcPayerOopDed = {pRetcode:1234, pRetmsg:'sample data'};
      service.updateProcPayerOopDed(procPayerOopDed, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayeroopdeds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcPayerOopDed', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcPayerOopDed(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayeroopdeds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});