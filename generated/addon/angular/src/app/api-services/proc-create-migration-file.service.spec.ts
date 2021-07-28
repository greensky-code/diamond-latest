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

import { ProcCreateMigrationFileService } from './proc-create-migration-file.service';
import { ProcCreateMigrationFile } from '../api-models/proc-create-migration-file.model'
import { ProcCreateMigrationFiles } from "../api-models/testing/fake-proc-create-migration-file.model"

describe('ProcCreateMigrationFileService', () => {
  let injector: TestBed;
  let service: ProcCreateMigrationFileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcCreateMigrationFileService]
    });
    injector = getTestBed();
    service = injector.get(ProcCreateMigrationFileService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcCreateMigrationFiles', () => {
    it('should return an Promise<ProcCreateMigrationFile[]>', () => {
      const procCreateMigrationFile = [
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'},
       {pRetcode:1234, pRetmsg:'sample data'}

      ];
      service.getProcCreateMigrationFiles().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/proccreatemigrationfiles/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procCreateMigrationFile);
    });
  });


  describe('#createProcCreateMigrationFile', () => {
    var id = 1;
    it('should return an Promise<ProcCreateMigrationFile>', () => {
      const procCreateMigrationFile: ProcCreateMigrationFile = {pRetcode:1234, pRetmsg:'sample data'};
      service.createProcCreateMigrationFile(procCreateMigrationFile).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccreatemigrationfiles`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcCreateMigrationFile', () => {
    var id = 1;
    it('should return an Promise<ProcCreateMigrationFile>', () => {
      const procCreateMigrationFile: ProcCreateMigrationFile = {pRetcode:1234, pRetmsg:'sample data'};
      service.updateProcCreateMigrationFile(procCreateMigrationFile, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccreatemigrationfiles/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcCreateMigrationFile', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcCreateMigrationFile(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/proccreatemigrationfiles/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});