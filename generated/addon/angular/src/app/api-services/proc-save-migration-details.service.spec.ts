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

import { ProcSaveMigrationDetailsService } from './proc-save-migration-details.service';
import { ProcSaveMigrationDetails } from '../api-models/proc-save-migration-details.model'
import { ProcSaveMigrationDetail } from "../api-models/testing/fake-proc-save-migration-details.model"

describe('ProcSaveMigrationDetailsService', () => {
  let injector: TestBed;
  let service: ProcSaveMigrationDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcSaveMigrationDetailsService]
    });
    injector = getTestBed();
    service = injector.get(ProcSaveMigrationDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcSaveMigrationDetail', () => {
    it('should return an Promise<ProcSaveMigrationDetails[]>', () => {
      const procSaveMigrationDetails = [
       {pSeqGroupId:1234, pStartDate:'sample data', pErrMsg:'sample data'},
       {pSeqGroupId:1234, pStartDate:'sample data', pErrMsg:'sample data'},
       {pSeqGroupId:1234, pStartDate:'sample data', pErrMsg:'sample data'}

      ];
      service.getProcSaveMigrationDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procsavemigrationdetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procSaveMigrationDetails);
    });
  });


  describe('#createProcSaveMigrationDetails', () => {
    var id = 1;
    it('should return an Promise<ProcSaveMigrationDetails>', () => {
      const procSaveMigrationDetails: ProcSaveMigrationDetails = {pSeqGroupId:1234, pStartDate:'sample data', pErrMsg:'sample data'};
      service.createProcSaveMigrationDetails(procSaveMigrationDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavemigrationdetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcSaveMigrationDetails', () => {
    var id = 1;
    it('should return an Promise<ProcSaveMigrationDetails>', () => {
      const procSaveMigrationDetails: ProcSaveMigrationDetails = {pSeqGroupId:1234, pStartDate:'sample data', pErrMsg:'sample data'};
      service.updateProcSaveMigrationDetails(procSaveMigrationDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavemigrationdetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcSaveMigrationDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcSaveMigrationDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procsavemigrationdetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});