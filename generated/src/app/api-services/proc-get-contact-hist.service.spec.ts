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

import { ProcGetContactHistService } from './proc-get-contact-hist.service';
import { ProcGetContactHist } from '../api-models/proc-get-contact-hist.model'
import { ProcGetContactHists } from "../api-models/testing/fake-proc-get-contact-hist.model"

describe('ProcGetContactHistService', () => {
  let injector: TestBed;
  let service: ProcGetContactHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetContactHistService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetContactHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetContactHists', () => {
    it('should return an Promise<ProcGetContactHist[]>', () => {
      const procGetContactHist = [
       {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'},
       {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'},
       {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'}

      ];
      service.getProcGetContactHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcontacthists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetContactHist);
    });
  });


  describe('#createProcGetContactHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetContactHist>', () => {
      const procGetContactHist: ProcGetContactHist = {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'};
      service.createProcGetContactHist(procGetContactHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcontacthists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetContactHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetContactHist>', () => {
      const procGetContactHist: ProcGetContactHist = {pSeqEntityId:1234, pPartEffDate:'sample data', pPartTermDate:'sample data'};
      service.updateProcGetContactHist(procGetContactHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcontacthists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetContactHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetContactHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcontacthists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});