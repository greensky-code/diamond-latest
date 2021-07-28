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

import { ProcGetHistoryService } from './proc-get-history.service';
import { ProcGetHistory } from '../api-models/proc-get-history.model'
import { ProcGetHistorys } from "../api-models/testing/fake-proc-get-history.model"

describe('ProcGetHistoryService', () => {
  let injector: TestBed;
  let service: ProcGetHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetHistoryService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetHistorys', () => {
    it('should return an Promise<ProcGetHistory[]>', () => {
      const procGetHistory = [
       {pGroupId:'sample data'},
       {pGroupId:'sample data'},
       {pGroupId:'sample data'}

      ];
      service.getProcGetHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgethistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetHistory);
    });
  });


  describe('#createProcGetHistory', () => {
    var id = 1;
    it('should return an Promise<ProcGetHistory>', () => {
      const procGetHistory: ProcGetHistory = {pGroupId:'sample data'};
      service.createProcGetHistory(procGetHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgethistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetHistory', () => {
    var id = 1;
    it('should return an Promise<ProcGetHistory>', () => {
      const procGetHistory: ProcGetHistory = {pGroupId:'sample data'};
      service.updateProcGetHistory(procGetHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgethistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgethistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});