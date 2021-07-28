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

import { ProcGetSubgpStateListService } from './proc-get-subgp-state-list.service';
import { ProcGetSubgpStateList } from '../api-models/proc-get-subgp-state-list.model'
import { ProcGetSubgpStateLists } from "../api-models/testing/fake-proc-get-subgp-state-list.model"

describe('ProcGetSubgpStateListService', () => {
  let injector: TestBed;
  let service: ProcGetSubgpStateListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetSubgpStateListService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetSubgpStateListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetSubgpStateLists', () => {
    it('should return an Promise<ProcGetSubgpStateList[]>', () => {
      const procGetSubgpStateList = [
       {pSubSeqGroupId:1234},
       {pSubSeqGroupId:1234},
       {pSubSeqGroupId:1234}

      ];
      service.getProcGetSubgpStateLists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgpstatelists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetSubgpStateList);
    });
  });


  describe('#createProcGetSubgpStateList', () => {
    var id = 1;
    it('should return an Promise<ProcGetSubgpStateList>', () => {
      const procGetSubgpStateList: ProcGetSubgpStateList = {pSubSeqGroupId:1234};
      service.createProcGetSubgpStateList(procGetSubgpStateList).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgpstatelists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetSubgpStateList', () => {
    var id = 1;
    it('should return an Promise<ProcGetSubgpStateList>', () => {
      const procGetSubgpStateList: ProcGetSubgpStateList = {pSubSeqGroupId:1234};
      service.updateProcGetSubgpStateList(procGetSubgpStateList, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgpstatelists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetSubgpStateList', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetSubgpStateList(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetsubgpstatelists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});