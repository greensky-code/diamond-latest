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

import { ProcCloneDataService } from './proc-clone-data.service';
import { ProcCloneData } from '../api-models/proc-clone-data.model'
import { ProcCloneDatas } from "../api-models/testing/fake-proc-clone-data.model"

describe('ProcCloneDataService', () => {
  let injector: TestBed;
  let service: ProcCloneDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCloneDataService]
    });
    injector = getTestBed();
    service = injector.get(ProcCloneDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCloneDatas', () => {
    it('should return an Promise<ProcCloneData[]>', () => {
      const procCloneData = [
       {pGroupId:'sample data', pCountryCode:'sample data', pUserId:'sample data'},
       {pGroupId:'sample data', pCountryCode:'sample data', pUserId:'sample data'},
       {pGroupId:'sample data', pCountryCode:'sample data', pUserId:'sample data'}

      ];
      service.getProcCloneDatas().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procclonedatas/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCloneData);
    });
  });


  describe('#createProcCloneData', () => {
    var id = 1;
    it('should return an Promise<ProcCloneData>', () => {
      const procCloneData: ProcCloneData = {pGroupId:'sample data', pCountryCode:'sample data', pUserId:'sample data'};
      service.createProcCloneData(procCloneData).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procclonedatas`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCloneData', () => {
    var id = 1;
    it('should return an Promise<ProcCloneData>', () => {
      const procCloneData: ProcCloneData = {pGroupId:'sample data', pCountryCode:'sample data', pUserId:'sample data'};
      service.updateProcCloneData(procCloneData, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procclonedatas/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCloneData', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCloneData(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procclonedatas/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});