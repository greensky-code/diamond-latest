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

import { ProcGetSuperGroupStateService } from './proc-get-super-group-state.service';
import { ProcGetSuperGroupState } from '../api-models/proc-get-super-group-state.model'
import { ProcGetSuperGroupStates } from "../api-models/testing/fake-proc-get-super-group-state.model"

describe('ProcGetSuperGroupStateService', () => {
  let injector: TestBed;
  let service: ProcGetSuperGroupStateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetSuperGroupStateService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetSuperGroupStateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetSuperGroupStates', () => {
    it('should return an Promise<ProcGetSuperGroupState[]>', () => {
      const procGetSuperGroupState = [
       {pGroupId:'sample data', oSuperGroupId:'sample data', oSuperGroupName:'sample data', oSuperSeqGroupId:1234},
       {pGroupId:'sample data', oSuperGroupId:'sample data', oSuperGroupName:'sample data', oSuperSeqGroupId:1234},
       {pGroupId:'sample data', oSuperGroupId:'sample data', oSuperGroupName:'sample data', oSuperSeqGroupId:1234}

      ];
      service.getProcGetSuperGroupStates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsupergroupstates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetSuperGroupState);
    });
  });


  describe('#createProcGetSuperGroupState', () => {
    var id = 1;
    it('should return an Promise<ProcGetSuperGroupState>', () => {
      const procGetSuperGroupState: ProcGetSuperGroupState = {pGroupId:'sample data', oSuperGroupId:'sample data', oSuperGroupName:'sample data', oSuperSeqGroupId:1234};
      service.createProcGetSuperGroupState(procGetSuperGroupState).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsupergroupstates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetSuperGroupState', () => {
    var id = 1;
    it('should return an Promise<ProcGetSuperGroupState>', () => {
      const procGetSuperGroupState: ProcGetSuperGroupState = {pGroupId:'sample data', oSuperGroupId:'sample data', oSuperGroupName:'sample data', oSuperSeqGroupId:1234};
      service.updateProcGetSuperGroupState(procGetSuperGroupState, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsupergroupstates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetSuperGroupState', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetSuperGroupState(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsupergroupstates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});