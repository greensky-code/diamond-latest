/* Copyright (c) 2020 . All Rights Reserved. */

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

import { CompileSchemaTmpService } from './compile-schema-tmp.service';
import { CompileSchemaTmp } from '../api-models/compile-schema-tmp.model'
import { CompileSchemaTmps } from "../api-models/testing/fake-compile-schema-tmp.model"

describe('CompileSchemaTmpService', () => {
  let injector: TestBed;
  let service: CompileSchemaTmpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompileSchemaTmpService]
    });
    injector = getTestBed();
    service = injector.get(CompileSchemaTmpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCompileSchemaTmps', () => {
    it('should return an Promise<CompileSchemaTmp[]>', () => {
      const compileSchemaTmp = [
       {objectName:'sample data', objectType:'sample data'},
       {objectName:'sample data', objectType:'sample data'},
       {objectName:'sample data', objectType:'sample data'}

      ];
      service.getCompileSchemaTmps().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/compileschematmps/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(compileSchemaTmp);
    });
  });


  describe('#createCompileSchemaTmp', () => {
    var id = 1;
    it('should return an Promise<CompileSchemaTmp>', () => {
      const compileSchemaTmp: CompileSchemaTmp = {objectName:'sample data', objectType:'sample data'};
      service.createCompileSchemaTmp(compileSchemaTmp).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/compileschematmps`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCompileSchemaTmp', () => {
    var id = 1;
    it('should return an Promise<CompileSchemaTmp>', () => {
      const compileSchemaTmp: CompileSchemaTmp = {objectName:'sample data', objectType:'sample data'};
      service.updateCompileSchemaTmp(compileSchemaTmp, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/compileschematmps/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCompileSchemaTmp', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCompileSchemaTmp(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/compileschematmps/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});