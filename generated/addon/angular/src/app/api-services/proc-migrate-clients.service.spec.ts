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

import { ProcMigrateClientsService } from './proc-migrate-clients.service';
import { ProcMigrateClients } from '../api-models/proc-migrate-clients.model'
import { ProcMigrateClient } from "../api-models/testing/fake-proc-migrate-clients.model"

describe('ProcMigrateClientsService', () => {
  let injector: TestBed;
  let service: ProcMigrateClientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcMigrateClientsService]
    });
    injector = getTestBed();
    service = injector.get(ProcMigrateClientsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcMigrateClient', () => {
    it('should return an Promise<ProcMigrateClients[]>', () => {
      const procMigrateClients = [
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'}

      ];
      service.getProcMigrateClient().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procmigrateclient/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procMigrateClients);
    });
  });


  describe('#createProcMigrateClients', () => {
    var id = 1;
    it('should return an Promise<ProcMigrateClients>', () => {
      const procMigrateClients: ProcMigrateClients = {pRetcode:1234, pRetmsg:'sample data'};
      service.createProcMigrateClients(procMigrateClients).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procmigrateclient`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcMigrateClients', () => {
    var id = 1;
    it('should return an Promise<ProcMigrateClients>', () => {
      const procMigrateClients: ProcMigrateClients = {pRetcode:1234, pRetmsg:'sample data'};
      service.updateProcMigrateClients(procMigrateClients, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procmigrateclient/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcMigrateClients', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcMigrateClients(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procmigrateclient/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});