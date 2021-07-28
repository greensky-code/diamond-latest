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

import { EpiProcessMasterService } from './epi-process-master.service';
import { EpiProcessMaster } from '../api-models/epi-process-master.model'
import { EpiProcessMasters } from "../api-models/testing/fake-epi-process-master.model"

describe('EpiProcessMasterService', () => {
  let injector: TestBed;
  let service: EpiProcessMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpiProcessMasterService]
    });
    injector = getTestBed();
    service = injector.get(EpiProcessMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEpiProcessMasters', () => {
    it('should return an Promise<EpiProcessMaster[]>', () => {
      const epiProcessMaster = [
       {processId:'sample data', seqProcessId:1234, commandString:'sample data', argumentString:'sample data', allowArgString:'sample data', pipeName:'sample data', expireTimeLimit:1234, maxProcess:1234, filePath:'sample data'},
       {processId:'sample data', seqProcessId:1234, commandString:'sample data', argumentString:'sample data', allowArgString:'sample data', pipeName:'sample data', expireTimeLimit:1234, maxProcess:1234, filePath:'sample data'},
       {processId:'sample data', seqProcessId:1234, commandString:'sample data', argumentString:'sample data', allowArgString:'sample data', pipeName:'sample data', expireTimeLimit:1234, maxProcess:1234, filePath:'sample data'}

      ];
      service.getEpiProcessMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(epiProcessMaster);
    });
  });


  describe('#createEpiProcessMaster', () => {
    var id = 1;
    it('should return an Promise<EpiProcessMaster>', () => {
      const epiProcessMaster: EpiProcessMaster = {processId:'sample data', seqProcessId:1234, commandString:'sample data', argumentString:'sample data', allowArgString:'sample data', pipeName:'sample data', expireTimeLimit:1234, maxProcess:1234, filePath:'sample data'};
      service.createEpiProcessMaster(epiProcessMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEpiProcessMaster', () => {
    var id = 1;
    it('should return an Promise<EpiProcessMaster>', () => {
      const epiProcessMaster: EpiProcessMaster = {processId:'sample data', seqProcessId:1234, commandString:'sample data', argumentString:'sample data', allowArgString:'sample data', pipeName:'sample data', expireTimeLimit:1234, maxProcess:1234, filePath:'sample data'};
      service.updateEpiProcessMaster(epiProcessMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEpiProcessMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEpiProcessMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});