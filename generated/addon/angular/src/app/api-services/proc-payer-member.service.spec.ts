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

import { ProcPayerMemberService } from './proc-payer-member.service';
import { ProcPayerMember } from '../api-models/proc-payer-member.model'
import { ProcPayerMembers } from "../api-models/testing/fake-proc-payer-member.model"

describe('ProcPayerMemberService', () => {
  let injector: TestBed;
  let service: ProcPayerMemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcPayerMemberService]
    });
    injector = getTestBed();
    service = injector.get(ProcPayerMemberService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcPayerMembers', () => {
    it('should return an Promise<ProcPayerMember[]>', () => {
      const procPayerMember = [
       {pSsnsLimit:1234, pRetcode:1234, pRetmsg:'sample data', pSsnAlert:'sample data'},
       {pSsnsLimit:1234, pRetcode:1234, pRetmsg:'sample data', pSsnAlert:'sample data'},
       {pSsnsLimit:1234, pRetcode:1234, pRetmsg:'sample data', pSsnAlert:'sample data'}

      ];
      service.getProcPayerMembers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procpayermembers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procPayerMember);
    });
  });


  describe('#createProcPayerMember', () => {
    var id = 1;
    it('should return an Promise<ProcPayerMember>', () => {
      const procPayerMember: ProcPayerMember = {pSsnsLimit:1234, pRetcode:1234, pRetmsg:'sample data', pSsnAlert:'sample data'};
      service.createProcPayerMember(procPayerMember).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayermembers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcPayerMember', () => {
    var id = 1;
    it('should return an Promise<ProcPayerMember>', () => {
      const procPayerMember: ProcPayerMember = {pSsnsLimit:1234, pRetcode:1234, pRetmsg:'sample data', pSsnAlert:'sample data'};
      service.updateProcPayerMember(procPayerMember, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayermembers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcPayerMember', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcPayerMember(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procpayermembers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});