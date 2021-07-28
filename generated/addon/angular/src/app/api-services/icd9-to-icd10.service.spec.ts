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

import { Icd9ToIcd10Service } from './icd9-to-icd10.service';
import { Icd9ToIcd10 } from '../api-models/icd9-to-icd10.model'
import { Icd9ToIcd10S } from "../api-models/testing/fake-icd9-to-icd10.model"

describe('Icd9ToIcd10Service', () => {
  let injector: TestBed;
  let service: Icd9ToIcd10Service;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Icd9ToIcd10Service]
    });
    injector = getTestBed();
    service = injector.get(Icd9ToIcd10Service);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIcd9ToIcd10S', () => {
    it('should return an Promise<Icd9ToIcd10[]>', () => {
      const icd9ToIcd10 = [
       {pDiagCode:'sample data'},
       {pDiagCode:'sample data'},
       {pDiagCode:'sample data'}

      ];
      service.getIcd9ToIcd10S().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/icd9toicd10s/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(icd9ToIcd10);
    });
  });


  describe('#createIcd9ToIcd10', () => {
    var id = 1;
    it('should return an Promise<Icd9ToIcd10>', () => {
      const icd9ToIcd10: Icd9ToIcd10 = {pDiagCode:'sample data'};
      service.createIcd9ToIcd10(icd9ToIcd10).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/icd9toicd10s`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIcd9ToIcd10', () => {
    var id = 1;
    it('should return an Promise<Icd9ToIcd10>', () => {
      const icd9ToIcd10: Icd9ToIcd10 = {pDiagCode:'sample data'};
      service.updateIcd9ToIcd10(icd9ToIcd10, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/icd9toicd10s/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIcd9ToIcd10', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIcd9ToIcd10(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/icd9toicd10s/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});