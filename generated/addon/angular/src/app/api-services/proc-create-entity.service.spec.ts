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

import { ProcCreateEntityService } from './proc-create-entity.service';
import { ProcCreateEntity } from '../api-models/proc-create-entity.model'
import { ProcCreateEntitys } from "../api-models/testing/fake-proc-create-entity.model"

describe('ProcCreateEntityService', () => {
  let injector: TestBed;
  let service: ProcCreateEntityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCreateEntityService]
    });
    injector = getTestBed();
    service = injector.get(ProcCreateEntityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCreateEntitys', () => {
    it('should return an Promise<ProcCreateEntity[]>', () => {
      const procCreateEntity = [
       {pGroupId:'sample data', pSeqCodeId:1234, pUserId:'sample data', oSeqEntityId:1234},
       {pGroupId:'sample data', pSeqCodeId:1234, pUserId:'sample data', oSeqEntityId:1234},
       {pGroupId:'sample data', pSeqCodeId:1234, pUserId:'sample data', oSeqEntityId:1234}

      ];
      service.getProcCreateEntitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proccreateentitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCreateEntity);
    });
  });


  describe('#createProcCreateEntity', () => {
    var id = 1;
    it('should return an Promise<ProcCreateEntity>', () => {
      const procCreateEntity: ProcCreateEntity = {pGroupId:'sample data', pSeqCodeId:1234, pUserId:'sample data', oSeqEntityId:1234};
      service.createProcCreateEntity(procCreateEntity).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccreateentitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCreateEntity', () => {
    var id = 1;
    it('should return an Promise<ProcCreateEntity>', () => {
      const procCreateEntity: ProcCreateEntity = {pGroupId:'sample data', pSeqCodeId:1234, pUserId:'sample data', oSeqEntityId:1234};
      service.updateProcCreateEntity(procCreateEntity, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccreateentitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCreateEntity', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCreateEntity(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccreateentitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});