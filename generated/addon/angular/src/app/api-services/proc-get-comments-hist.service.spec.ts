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

import { ProcGetCommentsHistService } from './proc-get-comments-hist.service';
import { ProcGetCommentsHist } from '../api-models/proc-get-comments-hist.model'
import { ProcGetCommentsHists } from "../api-models/testing/fake-proc-get-comments-hist.model"

describe('ProcGetCommentsHistService', () => {
  let injector: TestBed;
  let service: ProcGetCommentsHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetCommentsHistService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetCommentsHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetCommentsHists', () => {
    it('should return an Promise<ProcGetCommentsHist[]>', () => {
      const procGetCommentsHist = [
       {pSeqEntityId:1234},
       {pSeqEntityId:1234},
       {pSeqEntityId:1234}

      ];
      service.getProcGetCommentsHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcommentshists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetCommentsHist);
    });
  });


  describe('#createProcGetCommentsHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetCommentsHist>', () => {
      const procGetCommentsHist: ProcGetCommentsHist = {pSeqEntityId:1234};
      service.createProcGetCommentsHist(procGetCommentsHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcommentshists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetCommentsHist', () => {
    var id = 1;
    it('should return an Promise<ProcGetCommentsHist>', () => {
      const procGetCommentsHist: ProcGetCommentsHist = {pSeqEntityId:1234};
      service.updateProcGetCommentsHist(procGetCommentsHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcommentshists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetCommentsHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetCommentsHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetcommentshists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});