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

import { ProcPayerC4LoadService } from './proc-payer-c4-load.service';
import { ProcPayerC4Load } from '../api-models/proc-payer-c4-load.model'
import { ProcPayerC4Loads } from "../api-models/testing/fake-proc-payer-c4-load.model"

describe('ProcPayerC4LoadService', () => {
  let injector: TestBed;
  let service: ProcPayerC4LoadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcPayerC4LoadService]
    });
    injector = getTestBed();
    service = injector.get(ProcPayerC4LoadService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcPayerC4Loads', () => {
    it('should return an Promise<ProcPayerC4Load[]>', () => {
      const procPayerC4Load = [
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'},
       {poRetcode:1234, poRetmsg:'sample data'}

      ];
      service.getProcPayerC4Loads().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procpayerc4loads/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procPayerC4Load);
    });
  });


  describe('#createProcPayerC4Load', () => {
    var id = 1;
    it('should return an Promise<ProcPayerC4Load>', () => {
      const procPayerC4Load: ProcPayerC4Load = {poRetcode:1234, poRetmsg:'sample data'};
      service.createProcPayerC4Load(procPayerC4Load).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayerc4loads`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcPayerC4Load', () => {
    var id = 1;
    it('should return an Promise<ProcPayerC4Load>', () => {
      const procPayerC4Load: ProcPayerC4Load = {poRetcode:1234, poRetmsg:'sample data'};
      service.updateProcPayerC4Load(procPayerC4Load, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayerc4loads/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcPayerC4Load', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcPayerC4Load(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayerc4loads/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});