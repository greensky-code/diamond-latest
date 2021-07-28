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

import { ProcGetGroupFilingService } from './proc-get-group-filing.service';
import { ProcGetGroupFiling } from '../api-models/proc-get-group-filing.model'
import { ProcGetGroupFilings } from "../api-models/testing/fake-proc-get-group-filing.model"

describe('ProcGetGroupFilingService', () => {
  let injector: TestBed;
  let service: ProcGetGroupFilingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetGroupFilingService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetGroupFilingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetGroupFilings', () => {
    it('should return an Promise<ProcGetGroupFiling[]>', () => {
      const procGetGroupFiling = [
       {pGroupId:'sample data', pGroupName:'sample data', pResult:'sample data'},
       {pGroupId:'sample data', pGroupName:'sample data', pResult:'sample data'},
       {pGroupId:'sample data', pGroupName:'sample data', pResult:'sample data'}

      ];
      service.getProcGetGroupFilings().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupfilings/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetGroupFiling);
    });
  });


  describe('#createProcGetGroupFiling', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupFiling>', () => {
      const procGetGroupFiling: ProcGetGroupFiling = {pGroupId:'sample data', pGroupName:'sample data', pResult:'sample data'};
      service.createProcGetGroupFiling(procGetGroupFiling).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupfilings`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetGroupFiling', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupFiling>', () => {
      const procGetGroupFiling: ProcGetGroupFiling = {pGroupId:'sample data', pGroupName:'sample data', pResult:'sample data'};
      service.updateProcGetGroupFiling(procGetGroupFiling, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupfilings/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetGroupFiling', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetGroupFiling(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupfilings/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});