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

import { CsfGetRelatedBankAddrIdService } from './csf-get-related-bank-addr-id.service';
import { CsfGetRelatedBankAddrId } from '../api-models/csf-get-related-bank-addr-id.model'
import { CsfGetRelatedBankAddrIds } from "../api-models/testing/fake-csf-get-related-bank-addr-id.model"

describe('CsfGetRelatedBankAddrIdService', () => {
  let injector: TestBed;
  let service: CsfGetRelatedBankAddrIdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetRelatedBankAddrIdService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetRelatedBankAddrIdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetRelatedBankAddrIds', () => {
    it('should return an Promise<CsfGetRelatedBankAddrId[]>', () => {
      const csfGetRelatedBankAddrId = [
       {pSeqAddrId:1234},
       {pSeqAddrId:1234},
       {pSeqAddrId:1234}

      ];
      service.getCsfGetRelatedBankAddrIds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetrelatedbankaddrids/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetRelatedBankAddrId);
    });
  });


  describe('#createCsfGetRelatedBankAddrId', () => {
    var id = 1;
    it('should return an Promise<CsfGetRelatedBankAddrId>', () => {
      const csfGetRelatedBankAddrId: CsfGetRelatedBankAddrId = {pSeqAddrId:1234};
      service.createCsfGetRelatedBankAddrId(csfGetRelatedBankAddrId).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetrelatedbankaddrids`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetRelatedBankAddrId', () => {
    var id = 1;
    it('should return an Promise<CsfGetRelatedBankAddrId>', () => {
      const csfGetRelatedBankAddrId: CsfGetRelatedBankAddrId = {pSeqAddrId:1234};
      service.updateCsfGetRelatedBankAddrId(csfGetRelatedBankAddrId, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetrelatedbankaddrids/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetRelatedBankAddrId', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetRelatedBankAddrId(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetrelatedbankaddrids/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});