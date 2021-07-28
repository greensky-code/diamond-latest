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

import { UpdateStatusService } from './update-status.service';
import { UpdateStatus } from '../api-models/update-status.model'
import { UpdateStatu } from "../api-models/testing/fake-update-status.model"

describe('UpdateStatusService', () => {
  let injector: TestBed;
  let service: UpdateStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UpdateStatusService]
    });
    injector = getTestBed();
    service = injector.get(UpdateStatusService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getUpdateStatu', () => {
    it('should return an Promise<UpdateStatus[]>', () => {
      const updateStatus = [
       {pOrigSysTransId:'sample data', pProcessStat:'sample data'},
       {pOrigSysTransId:'sample data', pProcessStat:'sample data'},
       {pOrigSysTransId:'sample data', pProcessStat:'sample data'}

      ];
      service.getUpdateStatu().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/updatestatu/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(updateStatus);
    });
  });


  describe('#createUpdateStatus', () => {
    var id = 1;
    it('should return an Promise<UpdateStatus>', () => {
      const updateStatus: UpdateStatus = {pOrigSysTransId:'sample data', pProcessStat:'sample data'};
      service.createUpdateStatus(updateStatus).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/updatestatu`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateUpdateStatus', () => {
    var id = 1;
    it('should return an Promise<UpdateStatus>', () => {
      const updateStatus: UpdateStatus = {pOrigSysTransId:'sample data', pProcessStat:'sample data'};
      service.updateUpdateStatus(updateStatus, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/updatestatu/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteUpdateStatus', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteUpdateStatus(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/updatestatu/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});