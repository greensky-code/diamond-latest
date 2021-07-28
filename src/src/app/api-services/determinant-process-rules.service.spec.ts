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

import { DeterminantProcessRulesService } from './determinant-process-rules.service';
import { DeterminantProcessRules } from '../api-models/determinant-process-rules.model'
import { DeterminantProcessRuleses } from "../api-models/testing/fake-determinant-process-rules.model"

describe('DeterminantProcessRulesService', () => {
  let injector: TestBed;
  let service: DeterminantProcessRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeterminantProcessRulesService]
    });
    injector = getTestBed();
    service = injector.get(DeterminantProcessRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDeterminantProcessRuleses', () => {
    it('should return an Promise<DeterminantProcessRules[]>', () => {
      const determinantProcessRules = [
       {keyword:'sample data', fileType:'sample data', evaluationMethod:'sample data', excludeTable:'sample data', filterMethod:'sample data'},
       {keyword:'sample data', fileType:'sample data', evaluationMethod:'sample data', excludeTable:'sample data', filterMethod:'sample data'},
       {keyword:'sample data', fileType:'sample data', evaluationMethod:'sample data', excludeTable:'sample data', filterMethod:'sample data'}

      ];
      service.getDeterminantProcessRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/determinantprocessruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(determinantProcessRules);
    });
  });


  describe('#createDeterminantProcessRules', () => {
    var id = 1;
    it('should return an Promise<DeterminantProcessRules>', () => {
      const determinantProcessRules: DeterminantProcessRules = {keyword:'sample data', fileType:'sample data', evaluationMethod:'sample data', excludeTable:'sample data', filterMethod:'sample data'};
      service.createDeterminantProcessRules(determinantProcessRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantprocessruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDeterminantProcessRules', () => {
    var id = 1;
    it('should return an Promise<DeterminantProcessRules>', () => {
      const determinantProcessRules: DeterminantProcessRules = {keyword:'sample data', fileType:'sample data', evaluationMethod:'sample data', excludeTable:'sample data', filterMethod:'sample data'};
      service.updateDeterminantProcessRules(determinantProcessRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantprocessruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDeterminantProcessRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDeterminantProcessRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/determinantprocessruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});