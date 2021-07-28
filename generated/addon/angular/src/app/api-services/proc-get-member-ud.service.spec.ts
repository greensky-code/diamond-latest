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

import { ProcGetMemberUdService } from './proc-get-member-ud.service';
import { ProcGetMemberUd } from '../api-models/proc-get-member-ud.model'
import { ProcGetMemberUds } from "../api-models/testing/fake-proc-get-member-ud.model"

describe('ProcGetMemberUdService', () => {
  let injector: TestBed;
  let service: ProcGetMemberUdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetMemberUdService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetMemberUdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetMemberUds', () => {
    it('should return an Promise<ProcGetMemberUd[]>', () => {
      const procGetMemberUd = [
       {pSeqEntityId:1234},
       {pSeqEntityId:1234},
       {pSeqEntityId:1234}

      ];
      service.getProcGetMemberUds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetmemberuds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetMemberUd);
    });
  });


  describe('#createProcGetMemberUd', () => {
    var id = 1;
    it('should return an Promise<ProcGetMemberUd>', () => {
      const procGetMemberUd: ProcGetMemberUd = {pSeqEntityId:1234};
      service.createProcGetMemberUd(procGetMemberUd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetmemberuds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetMemberUd', () => {
    var id = 1;
    it('should return an Promise<ProcGetMemberUd>', () => {
      const procGetMemberUd: ProcGetMemberUd = {pSeqEntityId:1234};
      service.updateProcGetMemberUd(procGetMemberUd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetmemberuds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetMemberUd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetMemberUd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetmemberuds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});