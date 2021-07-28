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

import { AgeCheckService } from './age-check.service';
import { AgeCheck } from '../api-models/age-check.model'
import { AgeChecks } from "../api-models/testing/fake-age-check.model"

describe('AgeCheckService', () => {
  let injector: TestBed;
  let service: AgeCheckService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgeCheckService]
    });
    injector = getTestBed();
    service = injector.get(AgeCheckService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAgeChecks', () => {
    it('should return an Promise<AgeCheck[]>', () => {
      const ageCheck = [
       {pAge:1234, pPkgId:'sample data', pMedDef:'sample data', pAgeType:'sample data', pAgeLimit:'sample data'},
       {pAge:1234, pPkgId:'sample data', pMedDef:'sample data', pAgeType:'sample data', pAgeLimit:'sample data'},
       {pAge:1234, pPkgId:'sample data', pMedDef:'sample data', pAgeType:'sample data', pAgeLimit:'sample data'}

      ];
      service.getAgeChecks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/agechecks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ageCheck);
    });
  });


  describe('#createAgeCheck', () => {
    var id = 1;
    it('should return an Promise<AgeCheck>', () => {
      const ageCheck: AgeCheck = {pAge:1234, pPkgId:'sample data', pMedDef:'sample data', pAgeType:'sample data', pAgeLimit:'sample data'};
      service.createAgeCheck(ageCheck).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agechecks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAgeCheck', () => {
    var id = 1;
    it('should return an Promise<AgeCheck>', () => {
      const ageCheck: AgeCheck = {pAge:1234, pPkgId:'sample data', pMedDef:'sample data', pAgeType:'sample data', pAgeLimit:'sample data'};
      service.updateAgeCheck(ageCheck, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agechecks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAgeCheck', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAgeCheck(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/agechecks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});