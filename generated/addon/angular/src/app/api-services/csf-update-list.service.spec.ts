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

import { CsfUpdateListService } from './csf-update-list.service';
import { CsfUpdateList } from '../api-models/csf-update-list.model'
import { CsfUpdateLists } from "../api-models/testing/fake-csf-update-list.model"

describe('CsfUpdateListService', () => {
  let injector: TestBed;
  let service: CsfUpdateListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfUpdateListService]
    });
    injector = getTestBed();
    service = injector.get(CsfUpdateListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfUpdateLists', () => {
    it('should return an Promise<CsfUpdateList[]>', () => {
      const csfUpdateList = [
       {pOriginalList:'sample data', pNewPart:'sample data'},
       {pOriginalList:'sample data', pNewPart:'sample data'},
       {pOriginalList:'sample data', pNewPart:'sample data'}

      ];
      service.getCsfUpdateLists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfupdatelists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfUpdateList);
    });
  });


  describe('#createCsfUpdateList', () => {
    var id = 1;
    it('should return an Promise<CsfUpdateList>', () => {
      const csfUpdateList: CsfUpdateList = {pOriginalList:'sample data', pNewPart:'sample data'};
      service.createCsfUpdateList(csfUpdateList).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfupdatelists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfUpdateList', () => {
    var id = 1;
    it('should return an Promise<CsfUpdateList>', () => {
      const csfUpdateList: CsfUpdateList = {pOriginalList:'sample data', pNewPart:'sample data'};
      service.updateCsfUpdateList(csfUpdateList, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfupdatelists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfUpdateList', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfUpdateList(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfupdatelists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});