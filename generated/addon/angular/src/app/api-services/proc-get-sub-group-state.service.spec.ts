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

import { ProcGetSubGroupStateService } from './proc-get-sub-group-state.service';
import { ProcGetSubGroupState } from '../api-models/proc-get-sub-group-state.model'
import { ProcGetSubGroupStates } from "../api-models/testing/fake-proc-get-sub-group-state.model"

describe('ProcGetSubGroupStateService', () => {
  let injector: TestBed;
  let service: ProcGetSubGroupStateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetSubGroupStateService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetSubGroupStateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetSubGroupStates', () => {
    it('should return an Promise<ProcGetSubGroupState[]>', () => {
      const procGetSubGroupState = [
       {pGroupId:'sample data', oSubGroupId:'sample data', oSubGroupName:'sample data', oSubSeqGroupId:1234},
       {pGroupId:'sample data', oSubGroupId:'sample data', oSubGroupName:'sample data', oSubSeqGroupId:1234},
       {pGroupId:'sample data', oSubGroupId:'sample data', oSubGroupName:'sample data', oSubSeqGroupId:1234}

      ];
      service.getProcGetSubGroupStates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgroupstates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetSubGroupState);
    });
  });


  describe('#createProcGetSubGroupState', () => {
    var id = 1;
    it('should return an Promise<ProcGetSubGroupState>', () => {
      const procGetSubGroupState: ProcGetSubGroupState = {pGroupId:'sample data', oSubGroupId:'sample data', oSubGroupName:'sample data', oSubSeqGroupId:1234};
      service.createProcGetSubGroupState(procGetSubGroupState).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgroupstates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetSubGroupState', () => {
    var id = 1;
    it('should return an Promise<ProcGetSubGroupState>', () => {
      const procGetSubGroupState: ProcGetSubGroupState = {pGroupId:'sample data', oSubGroupId:'sample data', oSubGroupName:'sample data', oSubSeqGroupId:1234};
      service.updateProcGetSubGroupState(procGetSubGroupState, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgroupstates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetSubGroupState', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetSubGroupState(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgroupstates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});