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

import { CsfGetGroupForEntityService } from './csf-get-group-for-entity.service';
import { CsfGetGroupForEntity } from '../api-models/csf-get-group-for-entity.model'
import { CsfGetGroupForEntitys } from "../api-models/testing/fake-csf-get-group-for-entity.model"

describe('CsfGetGroupForEntityService', () => {
  let injector: TestBed;
  let service: CsfGetGroupForEntityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetGroupForEntityService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetGroupForEntityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetGroupForEntitys', () => {
    it('should return an Promise<CsfGetGroupForEntity[]>', () => {
      const csfGetGroupForEntity = [
       {pSeqEntityId:1234},
       {pSeqEntityId:1234},
       {pSeqEntityId:1234}

      ];
      service.getCsfGetGroupForEntitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupforentitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetGroupForEntity);
    });
  });


  describe('#createCsfGetGroupForEntity', () => {
    var id = 1;
    it('should return an Promise<CsfGetGroupForEntity>', () => {
      const csfGetGroupForEntity: CsfGetGroupForEntity = {pSeqEntityId:1234};
      service.createCsfGetGroupForEntity(csfGetGroupForEntity).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupforentitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetGroupForEntity', () => {
    var id = 1;
    it('should return an Promise<CsfGetGroupForEntity>', () => {
      const csfGetGroupForEntity: CsfGetGroupForEntity = {pSeqEntityId:1234};
      service.updateCsfGetGroupForEntity(csfGetGroupForEntity, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupforentitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetGroupForEntity', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetGroupForEntity(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupforentitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});