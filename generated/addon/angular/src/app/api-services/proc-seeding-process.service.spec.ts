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

import { ProcSeedingProcessService } from './proc-seeding-process.service';
import { ProcSeedingProcess } from '../api-models/proc-seeding-process.model'
import { ProcSeedingProcesses } from "../api-models/testing/fake-proc-seeding-process.model"

describe('ProcSeedingProcessService', () => {
  let injector: TestBed;
  let service: ProcSeedingProcessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcSeedingProcessService]
    });
    injector = getTestBed();
    service = injector.get(ProcSeedingProcessService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcSeedingProcesses', () => {
    it('should return an Promise<ProcSeedingProcess[]>', () => {
      const procSeedingProcess = [
       {pFileDir:'sample data', pFileName:'sample data', poMessage:'sample data', poMessageCode:'sample data'},
       {pFileDir:'sample data', pFileName:'sample data', poMessage:'sample data', poMessageCode:'sample data'},
       {pFileDir:'sample data', pFileName:'sample data', poMessage:'sample data', poMessageCode:'sample data'}

      ];
      service.getProcSeedingProcesses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procseedingprocesses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procSeedingProcess);
    });
  });


  describe('#createProcSeedingProcess', () => {
    var id = 1;
    it('should return an Promise<ProcSeedingProcess>', () => {
      const procSeedingProcess: ProcSeedingProcess = {pFileDir:'sample data', pFileName:'sample data', poMessage:'sample data', poMessageCode:'sample data'};
      service.createProcSeedingProcess(procSeedingProcess).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procseedingprocesses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcSeedingProcess', () => {
    var id = 1;
    it('should return an Promise<ProcSeedingProcess>', () => {
      const procSeedingProcess: ProcSeedingProcess = {pFileDir:'sample data', pFileName:'sample data', poMessage:'sample data', poMessageCode:'sample data'};
      service.updateProcSeedingProcess(procSeedingProcess, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procseedingprocesses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcSeedingProcess', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcSeedingProcess(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procseedingprocesses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});