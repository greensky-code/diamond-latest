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

import { GetSeqEntityIdService } from './get-seq-entity-id.service';
import { GetSeqEntityId } from '../api-models/get-seq-entity-id.model'
import { GetSeqEntityIds } from "../api-models/testing/fake-get-seq-entity-id.model"

describe('GetSeqEntityIdService', () => {
  let injector: TestBed;
  let service: GetSeqEntityIdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetSeqEntityIdService]
    });
    injector = getTestBed();
    service = injector.get(GetSeqEntityIdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetSeqEntityIds', () => {
    it('should return an Promise<GetSeqEntityId[]>', () => {
      const getSeqEntityId = [
       {pSeqCompanyId:1234, pSeqVendAddress:1234, pEntityCode:'sample data', oSeqEntityId:1234},
       {pSeqCompanyId:1234, pSeqVendAddress:1234, pEntityCode:'sample data', oSeqEntityId:1234},
       {pSeqCompanyId:1234, pSeqVendAddress:1234, pEntityCode:'sample data', oSeqEntityId:1234}

      ];
      service.getGetSeqEntityIds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getseqentityids/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getSeqEntityId);
    });
  });


  describe('#createGetSeqEntityId', () => {
    var id = 1;
    it('should return an Promise<GetSeqEntityId>', () => {
      const getSeqEntityId: GetSeqEntityId = {pSeqCompanyId:1234, pSeqVendAddress:1234, pEntityCode:'sample data', oSeqEntityId:1234};
      service.createGetSeqEntityId(getSeqEntityId).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getseqentityids`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetSeqEntityId', () => {
    var id = 1;
    it('should return an Promise<GetSeqEntityId>', () => {
      const getSeqEntityId: GetSeqEntityId = {pSeqCompanyId:1234, pSeqVendAddress:1234, pEntityCode:'sample data', oSeqEntityId:1234};
      service.updateGetSeqEntityId(getSeqEntityId, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getseqentityids/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetSeqEntityId', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetSeqEntityId(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getseqentityids/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});