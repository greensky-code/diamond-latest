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

import { ProcCarryOverService } from './proc-carry-over.service';
import { ProcCarryOver } from '../api-models/proc-carry-over.model'
import { ProcCarryOvers } from "../api-models/testing/fake-proc-carry-over.model"

describe('ProcCarryOverService', () => {
  let injector: TestBed;
  let service: ProcCarryOverService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCarryOverService]
    });
    injector = getTestBed();
    service = injector.get(ProcCarryOverService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCarryOvers', () => {
    it('should return an Promise<ProcCarryOver[]>', () => {
      const procCarryOver = [
       {pCoverage:'sample data', pCaroverType:'sample data', pBenpkId:'sample data', pStartDate:'sample data', pEndDate:'sample data', stDate:'sample data', endDate:'sample data'},
       {pCoverage:'sample data', pCaroverType:'sample data', pBenpkId:'sample data', pStartDate:'sample data', pEndDate:'sample data', stDate:'sample data', endDate:'sample data'},
       {pCoverage:'sample data', pCaroverType:'sample data', pBenpkId:'sample data', pStartDate:'sample data', pEndDate:'sample data', stDate:'sample data', endDate:'sample data'}

      ];
      service.getProcCarryOvers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proccarryovers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCarryOver);
    });
  });


  describe('#createProcCarryOver', () => {
    var id = 1;
    it('should return an Promise<ProcCarryOver>', () => {
      const procCarryOver: ProcCarryOver = {pCoverage:'sample data', pCaroverType:'sample data', pBenpkId:'sample data', pStartDate:'sample data', pEndDate:'sample data', stDate:'sample data', endDate:'sample data'};
      service.createProcCarryOver(procCarryOver).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccarryovers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCarryOver', () => {
    var id = 1;
    it('should return an Promise<ProcCarryOver>', () => {
      const procCarryOver: ProcCarryOver = {pCoverage:'sample data', pCaroverType:'sample data', pBenpkId:'sample data', pStartDate:'sample data', pEndDate:'sample data', stDate:'sample data', endDate:'sample data'};
      service.updateProcCarryOver(procCarryOver, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccarryovers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCarryOver', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCarryOver(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccarryovers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});