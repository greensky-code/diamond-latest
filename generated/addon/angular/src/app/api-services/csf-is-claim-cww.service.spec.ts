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

import { CsfIsClaimCwwService } from './csf-is-claim-cww.service';
import { CsfIsClaimCww } from '../api-models/csf-is-claim-cww.model'
import { CsfIsClaimCwws } from "../api-models/testing/fake-csf-is-claim-cww.model"

describe('CsfIsClaimCwwService', () => {
  let injector: TestBed;
  let service: CsfIsClaimCwwService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfIsClaimCwwService]
    });
    injector = getTestBed();
    service = injector.get(CsfIsClaimCwwService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfIsClaimCwws', () => {
    it('should return an Promise<CsfIsClaimCww[]>', () => {
      const csfIsClaimCww = [
       {pSeqClaimId:1234},
       {pSeqClaimId:1234},
       {pSeqClaimId:1234}

      ];
      service.getCsfIsClaimCwws().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfisclaimcwws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfIsClaimCww);
    });
  });


  describe('#createCsfIsClaimCww', () => {
    var id = 1;
    it('should return an Promise<CsfIsClaimCww>', () => {
      const csfIsClaimCww: CsfIsClaimCww = {pSeqClaimId:1234};
      service.createCsfIsClaimCww(csfIsClaimCww).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfisclaimcwws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfIsClaimCww', () => {
    var id = 1;
    it('should return an Promise<CsfIsClaimCww>', () => {
      const csfIsClaimCww: CsfIsClaimCww = {pSeqClaimId:1234};
      service.updateCsfIsClaimCww(csfIsClaimCww, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfisclaimcwws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfIsClaimCww', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfIsClaimCww(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfisclaimcwws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});