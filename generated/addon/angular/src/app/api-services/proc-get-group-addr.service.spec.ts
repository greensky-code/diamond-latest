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

import { ProcGetGroupAddrService } from './proc-get-group-addr.service';
import { ProcGetGroupAddr } from '../api-models/proc-get-group-addr.model'
import { ProcGetGroupAddrs } from "../api-models/testing/fake-proc-get-group-addr.model"

describe('ProcGetGroupAddrService', () => {
  let injector: TestBed;
  let service: ProcGetGroupAddrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetGroupAddrService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetGroupAddrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetGroupAddrs', () => {
    it('should return an Promise<ProcGetGroupAddr[]>', () => {
      const procGetGroupAddr = [
       {pGroupId:'sample data', oProvInd:'sample data', pGroupName:'sample data'},
       {pGroupId:'sample data', oProvInd:'sample data', pGroupName:'sample data'},
       {pGroupId:'sample data', oProvInd:'sample data', pGroupName:'sample data'}

      ];
      service.getProcGetGroupAddrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupaddrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetGroupAddr);
    });
  });


  describe('#createProcGetGroupAddr', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupAddr>', () => {
      const procGetGroupAddr: ProcGetGroupAddr = {pGroupId:'sample data', oProvInd:'sample data', pGroupName:'sample data'};
      service.createProcGetGroupAddr(procGetGroupAddr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupaddrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetGroupAddr', () => {
    var id = 1;
    it('should return an Promise<ProcGetGroupAddr>', () => {
      const procGetGroupAddr: ProcGetGroupAddr = {pGroupId:'sample data', oProvInd:'sample data', pGroupName:'sample data'};
      service.updateProcGetGroupAddr(procGetGroupAddr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupaddrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetGroupAddr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetGroupAddr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetgroupaddrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});