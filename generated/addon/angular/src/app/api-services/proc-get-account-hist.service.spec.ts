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

import { ProcGetAccountHistService } from './proc-get-account-hist.service';
import { ProcGetAccountHist } from '../api-models/proc-get-account-hist.model'
import { ProcGetAccountHists } from "../api-models/testing/fake-proc-get-account-hist.model"

describe('ProcGetAccountHistService', () => {
  let injector: TestBed;
  let service: ProcGetAccountHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetAccountHistService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetAccountHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetAccountHists', () => {
    it('should return an Promise<ProcGetAccountHist[]>', () => {
      const procGetAccountHist = [
       {pSeqEntityId:1234},
       {pSeqEntityId:1234},
       {pSeqEntityId:1234}

      ];
      service.getProcGetAccountHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaccounthists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetAccountHist);
    });
  });


  describe('#createProcGetAccountHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetAccountHist>', () => {
      const procGetAccountHist: ProcGetAccountHist = {pSeqEntityId:1234};
      service.createProcGetAccountHist(procGetAccountHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaccounthists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetAccountHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetAccountHist>', () => {
      const procGetAccountHist: ProcGetAccountHist = {pSeqEntityId:1234};
      service.updateProcGetAccountHist(procGetAccountHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaccounthists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetAccountHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetAccountHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetaccounthists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});