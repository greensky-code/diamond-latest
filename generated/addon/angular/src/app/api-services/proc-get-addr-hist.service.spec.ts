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

import { ProcGetAddrHistService } from './proc-get-addr-hist.service';
import { ProcGetAddrHist } from '../api-models/proc-get-addr-hist.model'
import { ProcGetAddrHists } from "../api-models/testing/fake-proc-get-addr-hist.model"

describe('ProcGetAddrHistService', () => {
  let injector: TestBed;
  let service: ProcGetAddrHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetAddrHistService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetAddrHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetAddrHists', () => {
    it('should return an Promise<ProcGetAddrHist[]>', () => {
      const procGetAddrHist = [
       {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'},
       {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'},
       {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'}

      ];
      service.getProcGetAddrHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddrhists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetAddrHist);
    });
  });


  describe('#createProcGetAddrHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetAddrHist>', () => {
      const procGetAddrHist: ProcGetAddrHist = {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'};
      service.createProcGetAddrHist(procGetAddrHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddrhists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetAddrHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetAddrHist>', () => {
      const procGetAddrHist: ProcGetAddrHist = {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'};
      service.updateProcGetAddrHist(procGetAddrHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddrhists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetAddrHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetAddrHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaddrhists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});